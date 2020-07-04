import React from 'react';
import './App.css';
import { WorkflowArrow, ButtonSize, RecordingInProgress } from './components/common';
import { generateRecognizer } from './helpers';
import InputDescription from './InputDescription';
import Output from './Output';
import InputUrl from './InputUrl';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recognizer: null,

      startDisabled: false,
      stopDisabled: true,
      showInProgress: false,

      modelUrl: '',
      output1PhoneNumber: '',
      output1Message: '',
      output2PhoneNumber: '',
      output2Message: '',

      errors: {
        modelUrl: false,
        output1PhoneNumber: false,
        output1Message: false,
        output2PhoneNumber: false,
        output2Message: false,
      },

      audioClass1Name: null,
      audioClass2Name: null,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
    this.onStopClick = this.onStopClick.bind(this);
    this.startRecognizer = this.startRecognizer.bind(this);
  }

  onChangeText(event, property) {
    let newState = {};
    const text = event.target.value;
    newState[property] = text;
    this.setState(newState);
  }

  onStopClick() {
    const { recognizer } = this.state;

    recognizer.stopListening()
      .then(() => {
        this.setState({
          recognizer: null,
          audioClass1Name: null,
          audioClass2Name: null,
          startDisabled: false,
          stopDisabled: true,
          showInProgress: false,
        });
      });
  }

  onStartClick() {
    let errorTracker = {};
    let errorPresent = false;

    const fieldValues = {
      modelUrl: this.state.modelUrl,
      output1PhoneNumber: this.state.output1PhoneNumber,
      output1Message: this.state.output1Message,
      output2PhoneNumber: this.state.output2PhoneNumber,
      output2Message: this.state.output2Message,
    }

    for (let field in fieldValues) {
      if (fieldValues.hasOwnProperty(field)) {
        const val = fieldValues[field];

        if (val.length < 1) {
          errorPresent = true;
          errorTracker[field] = true;
        } else {
          errorTracker[field] = false;
        }
      }
    }

    if (errorPresent) {
      this.setState({ errors: { ...errorTracker } });
    } else {
      this.startRecognizer(fieldValues, errorTracker);
    }
  }

  async startRecognizer(fieldValues, errorTracker) {
    const {
      modelUrl,
      output1PhoneNumber,
      output1Message,
      output2PhoneNumber,
      output2Message,
    } = fieldValues;

    const recognizer = await generateRecognizer(modelUrl);
    const classLabels = recognizer.wordLabels();
    const audioClass1 = classLabels[1];
    const audioClass2 = classLabels[2];

    recognizer.listen(result => {
      const scores = result.scores;

      const audioClass1Score = scores[1];
      const audioClass2Score = scores[2];

      if (audioClass1Score > audioClass2Score) {
        // audioClass1 triggers Output 1
        // output1PhoneNumber
        // output1Message
      } else if (audioClass2Score > audioClass1Score) {
        // audioClass2 triggers Output 2
        // output2PhoneNumber
        // output2Message
      }
    }, {
      // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
      probabilityThreshold: 0.99,
      includeSpectrogram: false,
      invokeCallbackOnNoiseAndUnknown: false,
      overlapFactor: 0.50,
    })
      .then(() => {
        this.setState({
          recognizer: recognizer,
          audioClass1Name: audioClass1,
          audioClass2Name: audioClass2,
          startDisabled: true,
          stopDisabled: false,
          showInProgress: true,
          errors: { ...errorTracker }
        });
      });
  }

  render() {
    let inProgressFeedback;

    if (this.state.showInProgress) {
      inProgressFeedback = <RecordingInProgress />
    }

    return (
      <div className='app'>
        <div className='app-title'>
          <p>
            BYOTM <span id='title-subtitle'>(Bring Your Own <a href='https://teachablemachine.withgoogle.com/' target='_blank' rel='noopener noreferrer'>Teachable Machine</a>)</span>
          </p>
        </div>

        {inProgressFeedback}

        <div className='app-workflow-container'>
          <InputUrl
            onChange={(e) => this.onChangeText(e, 'modelUrl')}
            error={this.state.errors.modelUrl}
          />

          <WorkflowArrow />

          <InputDescription
            audioClass1Name={this.state.audioClass1Name}
            audioClass2Name={this.state.audioClass2Name}
          />

          <div className='workflow-stacked-arrows'>
            <div>
              <WorkflowArrow />
            </div>
            <div>
              <WorkflowArrow />
            </div>
          </div>

          <Output
            onChangeText={this.onChangeText}
            errors={this.state.errors}
          />
        </div>
  
        <div className='app-buttons-container'>
          <ButtonSize
            id='start-button'
            disabled={this.state.startDisabled}
            size='large'
            variant='contained'
            styles={{ backgroundColor: '#5DC245', color: 'white' }}
            endIcon={{ icon: <PlayArrowIcon /> }}
            onClick={this.onStartClick}
          >
            START
          </ButtonSize>

          <ButtonSize
            id='stop-button'
            disabled={this.state.stopDisabled}
            size='large'
            variant='contained'
            styles={{ backgroundColor: '#CF142B', color: 'white' }}
            endIcon={{ icon: <StopIcon /> }}
            onClick={this.onStopClick}
          >
            STOP
          </ButtonSize>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

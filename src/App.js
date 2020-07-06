import React from 'react';
import './App.css';
import { WorkflowArrow, ButtonSize, RecordingInProgress, WaitingForConfirmation, InputUrl, InputDescription, Output } from './components';
import { generateRecognizer } from './helpers';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recognizer: null,

      waitingForConfirmation: false,
      waitingForConfirmationState: 'messagePreflight',

      audioClassTriggered: null,
      phoneNumberRecipient: null,
      messageToSend: null,

      startDisabled: false,
      stopDisabled: true,
      showInProgress: false,
      inputsDisabled: false,

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
    this.validateModelUrl = this.validateModelUrl.bind(this);
  }

  async onChangeText(event, property) {
    let newState = {};
    const text = event.target.value;
    newState[property] = text;

    if (property === 'modelUrl') {
      let modelUrl = text;

      if (this.validateModelUrl(modelUrl)) {
        const trimmedModelUrl = modelUrl.trim();
        const recognizer = await generateRecognizer(trimmedModelUrl);
        const classLabels = recognizer.wordLabels();
        let classLabelsWithoutBackgroundNoise = [];

        for (let i = 0; i < classLabels.length; i++) {
          let classLabel = classLabels[i];

          if (classLabel !== '_background_noise_') {
            classLabelsWithoutBackgroundNoise.push(classLabel);
          }
        }

        const audioClass1Name = classLabelsWithoutBackgroundNoise[0];
        const audioClass2Name = classLabelsWithoutBackgroundNoise[1];

        newState.modelUrl = trimmedModelUrl;
        newState.recognizer = recognizer;
        newState.audioClass1Name = audioClass1Name;
        newState.audioClass2Name = audioClass2Name;
      } else {
        newState.recognizer = null;
        newState.audioClass1Name = null;
        newState.audioClass2Name = null;
      }

      this.setState(newState);
    } else {
      this.setState(newState);
    }
  }

  onStopClick() {
    const { recognizer } = this.state;

    recognizer.stopListening()
      .then(() => {
        this.setState({
          inputsDisabled: false,
          startDisabled: false,
          stopDisabled: true,
          showInProgress: false,
          waitingForConfirmation: false,
          waitingForConfirmationState: 'messagePreflight',
          audioClassTriggered: null,
          phoneNumberRecipient: null,
          messageToSend: null,
        });
      });
  }

  validateModelUrl(modelUrl) {
    // valid modelUrl looks as follows:
    // https://teachablemachine.withgoogle.com/models/n2uo9MJNZ/
    const prefix = 'https://teachablemachine.withgoogle.com/models/';

    const trimmedModelUrl = modelUrl.trim();
    const id = trimmedModelUrl.split('models/')[1];

    return (trimmedModelUrl.includes(prefix) && (id.length === 9 || id.length === 10));
  }

  onStartClick() {
    let errorTracker = {};
    let errorPresent = false;

    const fieldValues = {
      modelUrl: this.state.modelUrl.trim(),
      output1PhoneNumber: this.state.output1PhoneNumber.trim(),
      output1Message: this.state.output1Message.trim(),
      output2PhoneNumber: this.state.output2PhoneNumber.trim(),
      output2Message: this.state.output2Message.trim(),
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

    if (!(this.state.recognizer)) {
      errorPresent = true;
      errorTracker.modelUrl = true;
    }

    if (errorPresent) {
      this.setState({ errors: { ...errorTracker } });
    } else {
      this.startRecognizer(fieldValues);
    }
  }

  async startRecognizer(fieldValues) {
    const {
      output1PhoneNumber,
      output1Message,
      output2PhoneNumber,
      output2Message,
    } = fieldValues;

    const {
      recognizer,
      audioClass1Name,
      audioClass2Name,
    } = this.state;

    recognizer.listen(result => {
      const scores = result.scores;
      const audioClass1Score = scores[1];
      const audioClass2Score = scores[2];

      let audioClassTriggered;
      let phoneNumberRecipient;
      let messageToSend;

      if (audioClass1Score > audioClass2Score) {
        audioClassTriggered = audioClass1Name;
        phoneNumberRecipient = output1PhoneNumber;
        messageToSend = output1Message;
      } else if (audioClass2Score > audioClass1Score) {
        audioClassTriggered = audioClass2Name;
        phoneNumberRecipient = output2PhoneNumber;
        messageToSend = output2Message;
      }

      if (!(this.state.waitingForConfirmation)) {
        this.setState({
          audioClassTriggered,
          phoneNumberRecipient,
          messageToSend,
          waitingForConfirmation: true,
        });
      } else { // currently waiting for confirmation
        if (this.state.audioClassTriggered !== audioClassTriggered) {
          this.setState({
            audioClassTriggered: null,
            phoneNumberRecipient: null,
            messageToSend: null,
            waitingForConfirmation: false,
          });
        } else {
          const body = {
            payload: {
              phoneNumber: this.state.phoneNumberRecipient,
              message: this.state.messageToSend
            }
          };

          this.setState({ waitingForConfirmationState: 'messageInFlight' });

          fetch('https://us-east1-byotm-282218.cloudfunctions.net/twilio-send-sms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
            .then(() => {
              this.setState({
                audioClassTriggered: null,
                phoneNumberRecipient: null,
                messageToSend: null,
                waitingForConfirmationState: 'messagePostFlight',
              });

              setTimeout(() => {
                this.setState({
                  waitingForConfirmation: false,
                  waitingForConfirmationState: 'messagePreflight',
                });
              }, 6000);
            })
            .catch((error) => {
              console.error('Error: ', error);
              this.setState({
                audioClassTriggered: null,
                phoneNumberRecipient: null,
                messageToSend: null,
                waitingForConfirmationState: 'messageFailedFlight',
              });

              setTimeout(() => {
                this.setState({
                  waitingForConfirmation: false,
                  waitingForConfirmationState: 'messagePreflight',
                });
              }, 6000);
            });
        }
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
          inputsDisabled: true,
          startDisabled: true,
          stopDisabled: false,
          showInProgress: true,
          errors: {
            modelUrl: false,
            output1PhoneNumber: false,
            output1Message: false,
            output2PhoneNumber: false,
            output2Message: false,
          },
        });
      });
  }

  render() {
    let inProgressFeedback;
    
    if (this.state.showInProgress) {
      inProgressFeedback = <RecordingInProgress />
    }

    let waitingForConfirmation;

    if (this.state.waitingForConfirmation) {
      waitingForConfirmation = (
        <WaitingForConfirmation
          flightState={this.state.waitingForConfirmationState}
          audioClass={this.state.audioClassTriggered} />
      );
    }

    return (
      <div className='app'>
        <div className='app-title'>
          <p>
            BYOTM <span id='title-subtitle'>(Bring Your Own <a href='https://teachablemachine.withgoogle.com/' target='_blank' rel='noopener noreferrer'>Teachable Machine</a>)</span>
          </p>
        </div>

        {inProgressFeedback}
        {waitingForConfirmation}

        <div className='app-workflow-container'>
          <InputUrl
            onChange={(e) => this.onChangeText(e, 'modelUrl')}
            error={this.state.errors.modelUrl}
            disabled={this.state.inputsDisabled}
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
            disabled={this.state.inputsDisabled}
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

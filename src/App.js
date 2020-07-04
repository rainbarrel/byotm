import React from 'react';
import './App.css';
import { WorkflowArrow, ButtonSize } from './components/common';
import listenForVoiceInput from './ListenForVoiceInput';
import InputDescription from './InputDescription';
import Output from './Output';
import InputUrl from './InputUrl';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDisabled: false,
      stopDisabled: true,

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
      }
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }

  onChangeText(event, property) {
    let newState = {};
    const text = event.target.value;
    newState[property] = text;
    this.setState(newState);
  }

  onStartClick() {
    let errorTracker = {};
    let errorPresent = false;

    const fieldsToValidate = {
      modelUrl: this.state.modelUrl,
      output1PhoneNumber: this.state.output1PhoneNumber,
      output1Message: this.state.output1Message,
      output2PhoneNumber: this.state.output2PhoneNumber,
      output2Message: this.state.output2Message,
    }

    for (let field in fieldsToValidate) {
      if (fieldsToValidate.hasOwnProperty(field)) {
        const val = fieldsToValidate[field];

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
      this.setState({
        startDisabled: true,
        stopDisabled: false,
        errors: { ...errorTracker }
      });

      // start :)
    }
  }

  render() {
    return (
      <div className='app'>
        <div className='app-title'>
          <p>
            BYOTM <span id='title-subtitle'>(Bring Your Own <a href='https://teachablemachine.withgoogle.com/' target='_blank' rel='noopener noreferrer'>Teachable Machine</a>)</span>
          </p>
        </div>

        <div className='app-workflow-container'>
          <InputUrl
            onChange={(e) => this.onChangeText(e, 'modelUrl')}
            error={this.state.errors.modelUrl}
          />

          <WorkflowArrow />

          <InputDescription />
          
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

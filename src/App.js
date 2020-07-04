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
    this.state = {};
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
          <InputUrl />

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

          <Output />
        </div>
  
        <div className='app-buttons-container'>
          <ButtonSize
            id='start-button'
            size='large'
            variant='contained'
            styles={{ backgroundColor: '#5DC245', color: 'white' }}
            endIcon={{ icon: <PlayArrowIcon /> }}
          >
            START
          </ButtonSize>

          <ButtonSize
            id='stop-button'
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

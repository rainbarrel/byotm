import React from 'react';
import './App.css';
import { WorkflowArrow } from './components/common';
import listenForVoiceInput from './ListenForVoiceInput';
import InputDescription from './InputDescription';
import InputUrl from './InputUrl';

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
            BYOTM <span id='title-subtitle'>(powered by <a href='https://teachablemachine.withgoogle.com/' target='_blank' rel='noopener noreferrer'>Teachable Machine</a>)</span>
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

          <InputDescription />
        </div>
  
        <div className='app-buttons-container'>
          <div>
          </div>
  
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

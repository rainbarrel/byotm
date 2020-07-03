import React from 'react';
import './App.css';
import { ButtonSize } from './components/common';
import listenForVoiceInput from './ListenForVoiceInput';
import TextField from '@material-ui/core/TextField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='app'>
        <div className='app-title'>
          <h1>
            BYOTM
          </h1>
        </div>

        <div className='app-workflow-container'>
          <div>
            <TextField
              id="workflow-url"
              label="Your Model URL"
              variant="outlined"
            />
          </div>
  
          <div>
          </div>
  
          <div>
          </div>
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

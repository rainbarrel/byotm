import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HightlightOffIcon from '@material-ui/icons/HighlightOff';

const WaitingForConfirmation = ({ flightState, audioClass }) => {
  let content;

  switch (flightState) {
    case 'messagePreflight':
      content = (
        <p className='waiting-for-confirmation-banner-text'>
          <span style={{ fontWeight: 'bold' }}>To confirm, please repeat trigger word for class '{audioClass}'</span>
          <br></br>
          (Speaking your other word will cancel selection)
        </p>
      );
      break;
    case 'messageInFlight':
      content = (
        <p className='waiting-for-confirmation-banner-text'>
          <CircularProgress />
          <br></br>
          (Sending your text message now…)
        </p>
      );
      break;
    case 'messagePostFlight':
      content = (
        <p className='waiting-for-confirmation-banner-text'>
          <CheckCircleIcon />
          <br></br>
          <span style={{ fontWeight: 'bold' }}>Your message has been sent!</span>
        </p>
      );
      break;
    case 'messageFailedFlight':
      content = (
        <p className='waiting-for-confirmation-banner-text'>
          <HightlightOffIcon />
          <br></br>
          <span style={{ fontWeight: 'bold' }}>Your message has failed to send. Please try again.</span>
        </p>
      );
      break;
    default:
      content = (
        <p className='waiting-for-confirmation-banner-text'>
          <span style={{ fontWeight: 'bold' }}>To confirm, please repeat trigger word for class '{audioClass}'</span>
          <br></br>
          (Speaking your other word will cancel selection)
        </p>
      );
  }
  
  return (
    <div className='waiting-for-confirmation-banner-container'>
      {content}
    </div>
  );
};

export { WaitingForConfirmation };

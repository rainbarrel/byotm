import React from 'react';

const WaitingForConfirmation = ({ audioClass }) => {
  return (
    <div className='waiting-for-confirmation-banner-container'>
      <p className='waiting-for-confirmation-banner-text'>
        <span style={{ fontWeight: 'bold' }}>To confirm, please repeat trigger word for class '{audioClass}'</span>
        <br></br>
        (Speaking your other word will cancel selection)
      </p>
    </div>
  );
};

export { WaitingForConfirmation };

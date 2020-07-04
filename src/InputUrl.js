import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
});

const InputUrl = () => {
  const classes = useStyles();

  return (
    <TextField
      id='workflow-url'
      classes={{ root: classes.root }}
      label='Your Model URL'
      variant='outlined'
    />
  );
};

export default InputUrl;

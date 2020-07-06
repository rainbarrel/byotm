import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
});

const HTMLTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const InputUrl = ({ onChange, error, disabled }) => {
  const classes = useStyles();
  const errorMessage = 'Please ensure this field is populated and a valid Model URL (see tooltip)'

  return (
    <HTMLTooltip
      title={
        <React.Fragment>
          This Model URL comes from your Audio Project in Teachable Machine (ex. https://teachablemachine.withgoogle.com/models/n2uo7MJNI/)
        </React.Fragment>
      }
    >
      <TextField
        id='workflow-url'
        disabled={disabled}
        error={error}
        helperText={error ? errorMessage : ''}
        onChange={onChange}
        classes={{ root: classes.root }}
        label='Your Model URL'
        variant='outlined'
      />
    </HTMLTooltip>
  );
};

export { InputUrl };

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: '0 4px 10px #777',
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
}));

const Output = ({ onChangeText, errors, disabled }) => {
  const classes = useStyles();
  const phoneErrorMessage = 'Please ensure this field is populated and formatted correctly (see placeholder)'
  const textBodyErrorMessage = 'Please ensure this field is populated'

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Output 1 (Text Message)
            </Typography>
          </Grid>
        </Grid>
        <TextField
          className="output-phone-number"
          disabled={disabled}
          label="Recipient Phone Number"
          placeholder="555-916-1234"
          onChange={(e) => onChangeText(e, 'output1PhoneNumber')}
          error={errors['output1PhoneNumber']}
          helperText={errors['output1PhoneNumber'] ? phoneErrorMessage : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <br></br>
        <br></br>
        <TextField
          className="output-message"
          disabled={disabled}
          label="Message"
          multiline
          placeholder="Hi, I just wanted to tell you that I love you!"
          onChange={(e) => onChangeText(e, 'output1Message')}
          error={errors['output1Message']}
          helperText={errors['output1Message'] ? textBodyErrorMessage : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Divider variant="middle" />

      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Output 2 (Text Message)
            </Typography>
          </Grid>
        </Grid>
        <TextField
          className="output-phone-number"
          disabled={disabled}
          label="Recipient Phone Number"
          placeholder="555-818-4321"
          onChange={(e) => onChangeText(e, 'output2PhoneNumber')}
          error={errors['output2PhoneNumber']}
          helperText={errors['output2PhoneNumber'] ? phoneErrorMessage : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <br></br>
        <br></br>
        <TextField
          className="output-message"
          disabled={disabled}
          label="Message"
          multiline
          placeholder="Can you please call me and leave a message? I miss you."
          onChange={(e) => onChangeText(e, 'output2Message')}
          error={errors['output2Message']}
          helperText={errors['output2Message'] ? textBodyErrorMessage : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export { Output };

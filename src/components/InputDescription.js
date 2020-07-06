import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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

const InputDescription = ({ audioClass1Name, audioClass2Name }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {audioClass1Name ? audioClass1Name : '<Audio Input 1>'}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
           Your Audio Class name will be populated here when you enter your Model URL. When your model recognizes audio input from this class, it will trigger Output 1, as seen to the right.
        </Typography>
      </div>

      <Divider variant="middle" />

      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {audioClass2Name ? audioClass2Name : '<Audio Input 2>'}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          Your Audio Class name will be populated here when you enter your Model URL. When your model recognizes audio input from this class, it will trigger Output 2, as seen to the right.
        </Typography>
      </div>
    </div>
  );
};

export { InputDescription };

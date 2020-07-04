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

const InputDescription = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              Audio Input 1
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
           This corresponds to the first audio class you created in Teachable Machine (after Background Noise). When your model recognizes this audio input, it will trigger Output 1, as seen to the right.
        </Typography>
      </div>

      <Divider variant="middle" />

      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              Audio Input 2
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          This corresponds to the second audio class you created in Teachable Machine (after Background Noise). When your model recognizes this audio input, it will trigger Output 2, as seen to the right.
        </Typography>
      </div>
    </div>
  );
};

export default InputDescription;

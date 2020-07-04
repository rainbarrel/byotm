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
              Your First Audio Input
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          This is taken from your Teachable Machine model. 
        </Typography>
      </div>

      <Divider variant="middle" />

      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
            Your Second Audio Input
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the
          hall.
        </Typography>
      </div>
    </div>
  );
};

export default InputDescription;

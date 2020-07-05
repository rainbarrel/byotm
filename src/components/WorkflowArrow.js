import React from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: '#1967D2',
    fontSize: '80px',
    stroke: '#eaf3ff',
  },
});

const WorkflowArrow = () => {
  const classes = useStyles();

  return (
    <TrendingFlatIcon
      classes={{ root: classes.root }}
    />
  );
};

export { WorkflowArrow };

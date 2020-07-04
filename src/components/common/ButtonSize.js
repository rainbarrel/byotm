import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const ButtonSize = (props) => {
  const {
    id,
    onClick,
    size,
    variant,
    styles,
    endIcon,
    children,
  } = props;

  const useStyles = makeStyles({
    root: styles,
  });

  const classes = useStyles();

  return (
    <Button
      id={id}
      classes={{ root: classes.root }}
      onClick={onClick}
      size={size}
      variant={variant}
      endIcon={endIcon.icon}
    >
      {children}
    </Button>
  );
};

export { ButtonSize };

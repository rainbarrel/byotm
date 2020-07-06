import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const ButtonSize = (props) => {
  const {
    id,
    disabled,
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
      disabled={disabled}
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

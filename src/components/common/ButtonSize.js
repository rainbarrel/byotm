import React from 'react';
import { Button } from 'antd';

const ButtonSize = (props) => {
  const {
    id,
    onClick,
    size,
    type,
    children,
  } = props;

  return (
    <Button id={id} onClick={onClick} size={size} type={type}>
      {children}
    </Button>
  );
};

export { ButtonSize };

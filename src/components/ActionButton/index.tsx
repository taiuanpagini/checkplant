import React from 'react';
import { ActionButtonProps } from './interface';

import { Container } from './styles';

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { title, color, icon, action, background, border, selected } = props;

  return (
    <Container
      title={title}
      onClick={() => action()}
      color={color}
      background={background}
      border={border}
      selected={selected}>
      {title}
      {icon && <img src={icon} alt="icon-button" />}
    </Container>
  );
};

export default ActionButton;
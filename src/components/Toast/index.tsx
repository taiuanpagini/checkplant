import React, { useEffect } from 'react';
import iconImportant from '../../images/IconImportant.svg';
import ActionButton from '../ActionButton';
import { ToastProps } from './interface';

import './styles.scss';

const Toast: React.FC<ToastProps> = (props) => {
  const { title, description, showModal, setShowModal, action } = props;

  return (
    showModal ? (
      <div className="fixed">
        <div className="container-alert">
          <img
            src={iconImportant}
            alt="icon-alert"
          />
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="buttons-alert">
            <ActionButton
              title="Sim"
              background="#D20200"
              border="#D20200"
              color="#ffffff"
              action={action}
            />

            <ActionButton
              title="Não"
              background="#ffffff"
              border="#C8CED8"
              color="#1f2729"
              action={() => setShowModal(false)}
            />
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Toast;

import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  // Instead of using Aux custom component, I'm trying a shorthand of React.Fragment
  <>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.modalClosed} />
  </>
);

const noChange = (prevModal, nextModal) =>
  prevModal.show === nextModal.show &&
  prevModal.children === nextModal.children; // included to show loading state

export default React.memo(modal, noChange);

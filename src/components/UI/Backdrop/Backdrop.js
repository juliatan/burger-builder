import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) =>
  props.show ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;

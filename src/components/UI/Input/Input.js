import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={classes.InputElement} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

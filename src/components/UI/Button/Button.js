import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
  // eslint-disable-next-line react/button-has-type
  <button
    onClick={props.clicked}
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;

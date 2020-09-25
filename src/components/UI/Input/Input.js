import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

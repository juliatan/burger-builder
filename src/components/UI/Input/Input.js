import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement;
  let validationError;

  const classesArray = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    classesArray.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>Please enter a valid value!</p>
    );
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classesArray.join(' ')}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classesArray.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
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
          className={classesArray.join(' ')}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classesArray.join(' ')}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;

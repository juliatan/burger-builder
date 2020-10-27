import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        label={control.label}
        key={control.type}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabledInfo[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.disabled}
      type="button"
      onClick={props.ordered}
    >
      {props.isAuth ? 'Order Now!' : 'Sign up to order'}
    </button>
  </div>
);

export default buildControls;

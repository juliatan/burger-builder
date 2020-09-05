import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = () => (
  <div className={classes.BuildControls}>
    {controls.map((control) => (
      <BuildControl label={control.label} key={control.type} />
    ))}
  </div>
);

export default buildControls;

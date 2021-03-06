import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        This will cost <strong>£{props.totalPrice.toFixed(2)}</strong>. Continue
        to checkout?
      </p>
      <Button buttonType="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;

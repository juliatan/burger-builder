import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  // want to transform the ingredients state to array of ingredients
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <BurgerIngredient type={ingredientKey} key={ingredientKey + index} />
        );
      });
    })
    // collapse arrays to count all ingredients to check if it's an empty burger
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Start adding your ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

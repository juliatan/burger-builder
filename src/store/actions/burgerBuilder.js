import * as actionTypes from './actionTypes';

// the names of the functions should be the camel case version of the constant
// in burgerBuilder container, ingredient name is being passed in dispatch method
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

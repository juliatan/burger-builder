import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

// Async functions below - requires redux-thunk
export const initIngredients = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/ingredients.json');
      dispatch(setIngredients(response.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  }
}
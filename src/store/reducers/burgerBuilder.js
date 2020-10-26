import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.0,
  cheese: 0.4,
  meat: 1.2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // need to deep copy nested items
          ...state.ingredients,
          // ES6 shortcut for overwriting existing key with new value
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          // manually create ingredients object so we can set order of ingredients
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      });
    // return {
    //   ...state,
    //   ingredients: {
    //     // manually create ingredients object so we can set order of ingredients
    //     salad: action.ingredients.salad,
    //     bacon: action.ingredients.bacon,
    //     cheese: action.ingredients.cheese,
    //     meat: action.ingredients.meat,
    //   },
    //   totalPrice: 4,
    //   error: false,
    // };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    // return {
    //   ...state,
    //   error: true,
    // };
    default:
      return state;
  }
};

export default reducer;

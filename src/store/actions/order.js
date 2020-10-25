import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// for purpose of redirect upon successful order
// be very carefully about when to call this because it will affect redirects on consecutive orders if the purchased state has not be cleared early enough because this is called on a component that's rendered too late. e.g. don't put in Checkout, instead put in BurgerBuilder.
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// async actions
export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post('/orders.json', orderData);
      console.log(response);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

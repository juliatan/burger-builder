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

// async actions
export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const saveOrder = async () => {
        await axios.post('/orders.json', orderData);
      };
      const response = await saveOrder();
      console.log(response);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

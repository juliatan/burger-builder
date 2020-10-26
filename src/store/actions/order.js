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

// async action
export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post('/orders.json', orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

// Fetch existing orders in database
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

// async action
export const fetchOrders = (token) => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      // note: amended Firebase database rules so need auth token to get Orders
      // note: instead of passing in token, could also use getState method next to dispatch.
      const response = await axios.get(`/orders.json?auth=${token}`);
      const orders = response.data;

      // probably best to do data transformations in actions rather than reducer
      const fetchedOrders = [];
      Object.entries(orders).forEach((order) => {
        fetchedOrders.push({ ...order[1], id: order[0] });
      });
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};

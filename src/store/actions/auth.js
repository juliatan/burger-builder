import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    // use to set loading state later
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    const API_KEY = 'AIzaSyB1P_vEN4bEeNZdnVMpaIMOFfAS3nUqer4';
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    dispatch(authStart());
    try {
      const response = await axios.post(url, authData);
      console.log(response);
      dispatch(authSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(authFail(error));
    }
  };
};

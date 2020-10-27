import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    // use to set loading state later
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
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

    try {
      const response = await axios.post(url, authData);
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000,
      );
      // localStorage is a browser storage system, comes inbuilt into JS
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  // not for running async code, but for dispatching multiple actions
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      // local storage gives us a string - need to convert to Date object
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = new Date(localStorage.getItem('userId'));
        dispatch(authSuccess(token, userId));
        // logout automatically when token expires
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
          ),
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

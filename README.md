# Burger Builder

This fun project was developed primarily for me to practice React, React Router, React Redux and testing with Jest and Enzyme. It allows users to dynamically customise a burger and place an order. This order is saved to a Firebase database and can be retrieved on-demand. There's a live version of the app [here](https://julias-burgers.netlify.app/).

## Requirements

- Some of the libraries imported and used:
  - `react`
  - `react-router-dom`
  - `react-redux`
  - `axios`
  - `enzyme`
  - `eslint`
  - `prettier`

## App features

- Navbar and side drawer for navigation.
- Saves orders to Firebase database via Axios. Orders can subsequently be retrieved.
- Axios interceptors to handle errors on app-wide basis via a higher order component `withErrorHandler`.
- Routing within SPA with React Router.
- State management with Redux.
- User authentication with Firebase.
- Lazy loading higher order component `asyncComponent` that allows us to lazy load any component.

## Getting started

- Install Node.js and Yarn if you don't already have them installed.
- In this directory, run `yarn install`.
- You'll need to create your own file called `axios-orders.js` in the /src folder. See below for the code to be included.
- You'll also need to create a `.env` file in the root folder. See below for the code to be included.
- Start the React server in terminal with `yarn start`.
- Run tests with `yarn test`.

### axios-orders.js file

```
import axios from 'axios';

const instance = axios.create({
  baseURL: 'INSERT YOUR FIREBASE DATABASE URL HERE',
});

export default instance;
```

### .env file

```
REACT_APP_FIREBASE_API_KEY = INSERT_YOUR_FIREBASE_API_KEY
```

## Testing suite

- Wrote a few practice tests with Enzyme and Jest (see `auth` reducer, `BurgerBuilder` component and `NavigationItems` component).

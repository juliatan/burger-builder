import React from 'react';
// need to import because we use Webpack to compile the production directory
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="My Burger Builder" />
  </div>
);

export default logo;

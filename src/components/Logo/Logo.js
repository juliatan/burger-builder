import React from 'react';
// need to import because we use Webpack to compile the production directory
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  // have put in the optional ability to overwrite the height of logo directly through a prop
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="My Burger Builder" />
  </div>
);

export default logo;

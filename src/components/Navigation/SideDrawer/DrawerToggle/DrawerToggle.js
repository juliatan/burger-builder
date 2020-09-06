import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div onClick={props.clicked} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;

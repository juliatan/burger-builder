import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
    {/* replace normal links with router links */}
    {/* <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a> */}
  </li>
);

export default navigationItem;

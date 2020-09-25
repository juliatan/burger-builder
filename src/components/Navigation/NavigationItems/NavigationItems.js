import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ol className={classes.NavigationItems}>
    {/* need the exact property, so that we can pass it to NavLink and not render / as always active */}
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ol>
);

export default navigationItems;

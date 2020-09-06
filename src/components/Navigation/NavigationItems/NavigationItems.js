import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ol className={classes.NavigationItems}>
    {/* active prop is boolean so don't need to explicitly set to true */}
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">
      Checkout
    </NavigationItem>
  </ol>
);

export default navigationItems;

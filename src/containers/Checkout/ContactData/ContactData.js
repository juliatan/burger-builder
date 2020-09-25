import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    address: {
      street: '',
      // city: 'London',
      postal: '',
    },
    email: '',
    name: '',
    // deliveryMethod: 'fastest',
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            placeholder="name"
            name="name"
          />
          <input
            className={classes.Input}
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            className={classes.Input}
            type="text"
            placeholder="street"
            name="street"
          />
          <input
            className={classes.Input}
            type="text"
            placeholder="postal code"
            name="postal"
          />
          <Button buttonType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;

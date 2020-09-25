import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const post = {
      customer: {
        address: {
          street: '123 street',
          city: 'London',
          country: 'UK',
        },
        email: 'test@test.com',
        name: 'Julia Gulia',
      },
      deliveryMethod: 'fastest',
      // ingrdients and totalPrice props come from checkout.js Route render
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice, // in real app, would double check calc on server side
    };
    try {
      const saveOrder = async () => {
        await axios.post('/orders.json', post);
      };
      saveOrder();
      this.setState({
        loading: false,
      });

      // history prop only available because we purposefully passed in the router props in the checkout.js render
      this.props.history.push('/');
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" placeholder="name" name="name" />
        <Input
          inputtype="input"
          type="email"
          placeholder="email"
          name="email"
        />
        <Input
          inputtype="input"
          type="text"
          placeholder="street"
          name="street"
        />
        <Input
          inputtype="input"
          type="text"
          placeholder="postal code"
          name="postal"
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

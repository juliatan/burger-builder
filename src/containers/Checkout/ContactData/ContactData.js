/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); // stops the redirect

    this.setState({ loading: true });
    const formData = {};
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line prefer-const
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const post = {
      // ingrdients and totalPrice props come from checkout.js Route render
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice, // in real app, would double check calc on server side
      orderData: formData,
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

  inputChangedHandler = (event, inputIdentifier) => {
    // in order to change the state in a safe way, we should create a DEEP copy of the state object
    // Spread operator copy only copies on a single level. Need to repeat for nested objects.
    // Never mutate this.state directly as called setState() afterwards may replace the mutation made.
    // Always treat this.state as immutable.

    const updatedOrderForm = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    const isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.valid = isValid;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  };

  checkValidity = (value, rules) => {
    let isValid = true; // need to also check && isValid to ensure AND not OR check
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  render() {
    const formElementsArray = [];
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line prefer-const
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.inputChangedHandler(event, element.id)}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
          />
        ))}

        <Button buttonType="Success">Order</Button>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import * as actions from '../../../store/actions';

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
        value: 'fastest',
        validation: {},
        valid: true, // needed to ensure formIsValid properly updated below
      },
    },
    // loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); // stops the redirect

    // this.setState({ loading: true });
    const formData = {};

    Object.keys(this.state.orderForm).forEach((formElementIdentifier) => {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    });

    const orderData = {
      // ingrdients and totalPrice props come from checkout.js Route render
      ingredients: this.props.ings,
      totalPrice: this.props.price, // in real app, would double check calc on server side
      orderData: formData,
    };

    this.props.onOrderBurger(orderData, this.props.token);

    // move to Redux
    // try {
    //   const saveOrder = async () => {
    //     await axios.post('/orders.json', post);
    //   };
    //   saveOrder();
    //   this.setState({
    //     loading: false,
    //   });

    //   // history prop only available because we purposefully passed in the router props in the checkout.js render
    //   this.props.history.push('/');
    // } catch (error) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
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

    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach((key) => {
      // add && formIsValid to ensure all previous checks are also taken into account
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    });
    // alternatively: old syntax..
    // for (let inputIdent in updatedOrderForm) {
    //   formIsValid = updatedOrderForm[inputIdent].valid && formIsValid;
    // }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
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

    Object.keys(this.state.orderForm).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    });

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

        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      // if (this.state.loading) {
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));

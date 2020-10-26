import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  signupHandler = (event) => {
    event.preventDefault(); // stops the redirect

    const formData = {};

    Object.keys(this.state.controls).forEach((formElementIdentifier) => {
      formData[formElementIdentifier] = this.state.controls[
        formElementIdentifier
      ].value;
    });

    const signupData = {
      signupData: formData,
    };

    try {
      const saveOrder = async () => {
        await axios.post('/signup.json', signupData);
      };
      saveOrder();
      // this.setState({
      //   loading: false,
      // });

      // history prop only available because we purposefully passed in the router props in the checkout.js render
      // this.props.history.push('/');
    } catch (error) {
      // this.setState({
      //   loading: false,
      // });
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation,
        ),
        touched: true,
      },
    };

    this.setState({ controls: updatedControls });
  };

  checkValidity = (value, rules) => {
    let isValid = true; // need to also check && isValid to ensure AND not OR check
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  render() {
    const formElementsArray = [];

    Object.keys(this.state.controls).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    });

    const form = (
      <form onSubmit={this.signupHandler}>
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
          Signup
        </Button>
      </form>
    );

    return (
      <div className={classes.Auth}>
        <h4>Signup for some burgers!</h4>
        {form}
      </div>
    );
  }
}

export default Auth;

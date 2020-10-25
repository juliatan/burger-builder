import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   totalPrice: 0,
  // };

  // componentDidMount() {
  //   // comes via BurgerBuilder where pushed route comes with a state object I setup
  //   const { ingredients, totalPrice } = this.props.location.state;
  //   this.setState({ ingredients, totalPrice });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            // eslint-disable-next-line prefer-template
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            // replaced with render to pass in our own props, and the router props
            // render={(props) => (
            //   <ContactData
            //     ingredients={this.props.ings}
            //     totalPrice={this.props.price}
            //     {...props}
            //   />
            // )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);

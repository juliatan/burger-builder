import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);

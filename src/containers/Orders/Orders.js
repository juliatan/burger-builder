import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };

  componentDidMount() {
    // this.fetchOrders();
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  // moved to Redux
  // fetchOrders = async () => {
  //   const response = await axios.get('/orders.json');
  //   const orders = response.data;

  //   const fetchedOrders = [];
  //   Object.entries(orders).forEach((order) => {
  //     fetchedOrders.push({ ...order[1], id: order[0] });
  //   });
  //   // Alternatively -> for (let key in orders) {
  //   //   fetchedOrders.push({ ...orders[key], id: key });
  //   // }

  //   this.setState({ orders: fetchedOrders, loading: false });
  // };

  render() {
    let ordersArray = this.props.loading ? <Spinner /> : null;
    // let ordersArray = this.state.loading ? <Spinner /> : null;
    if (this.props.orders) {
      // if (this.state.orders) {
      ordersArray = this.props.orders.map((order) => (
        <Order
          ingredients={order.ingredients}
          key={order.id}
          price={order.totalPrice}
        />
      ));
    }
    return <div>{ordersArray}</div>;
  }
}

const mapPropsToState = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));

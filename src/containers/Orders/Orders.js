import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    const response = await axios.get('/orders.json');
    const orders = response.data;

    const fetchedOrders = [];
    Object.entries(orders).forEach((order) => {
      fetchedOrders.push({ ...order[1], id: order[0] });
    });
    // Alternatively -> for (let key in orders) {
    //   fetchedOrders.push({ ...orders[key], id: key });
    // }

    this.setState({ orders: fetchedOrders, loading: false });
  };

  render() {
    let ordersArray = this.state.loading ? <Spinner /> : null;
    if (this.state.orders) {
      ordersArray = this.state.orders.map((order) => (
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

export default withErrorHandler(Orders, axios);

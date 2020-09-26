import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.0,
  cheese: 0.4,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  // This lifecycle hook is the best one for doing API calls. It renders after child components have been rendered.
  // Update in state will result in a rerender, so in the meantime,
  // we need to have loading state when this.state.ingredients === null
  componentDidMount() {
    this.fetchIngredients();
  }

  fetchIngredients = async () => {
    try {
      const response = await axios.get('/ingredients.json');
      this.setState({ ingredients: response.data });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  // note this does need arrow function because it's being passed as a prop and relies on a button click in the DOM
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.props.history.push('/checkout');
    this.props.history.push({
      pathname: '/checkout',
      state: {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice,
      },
    });
  };

  // note this doesn't need arrow function as it's not being called in the DOM
  updatePurchaseState(ingredients) {
    const total = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: total > 0,
    });
  }

  render() {
    const disabledInfo = {
      // ...this.state.ingredients, -> replace all incidences throughout
      ...this.props.ings,
    };

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? <p>There was an error</p> : <Spinner />;
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            disabled={!this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancelled={this.purchaseCancelHandler}
          continued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));

// note that the name of the folder and file starts with lower case since we won't use this as a component, only a wrapper
// created anonymous class with no name since we don't have to refer to it (only it's parent function)

import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          // same as this.setState({ error: error })
          this.setState({ error });
        },
      );
    }

    clearError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        // return the WrappedComponent and pass along whatever props it comes with.
        // see BurgerBuilder component
        <Aux>
          <Modal show={this.state.error} modalClosed={this.clearError}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent
            // eslint-disable-next-line
            {...this.props}
          />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

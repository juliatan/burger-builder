import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      // eslint-disable-next-line react/jsx-props-no-spreading
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;

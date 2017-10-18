/**
  https://gist.github.com/lencioni/643a78712337d255f5c031bfc81ca4cf
  https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
*/

import React, { Component } from 'react';

const asyncComponent = (getComponent => (
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    componentDidMount() {
      getComponent()
        .then((Component) => {
          this.setState({ Component });
        });
    }

    render() {
      const { Component } = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      return null;
    }
  }
));

export default asyncComponent;

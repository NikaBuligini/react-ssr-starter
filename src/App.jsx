/** @flow */

import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

const Wrapper = styled.div`
  font-size: 80px;
  font-family: Segoe UI;
`;

type State = {
  counter: number,
};

class App extends React.Component<*, State> {
  state = {
    counter: 0,
  };

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    this.setState(
      prevState => ({ counter: prevState.counter + 1 }),
      () => {
        this.timer = setTimeout(() => {
          this.tick();
        }, 1000);
      },
    );
  };

  componentWillUnmount() {
    this.stop();
  }

  stop = () => {
    clearTimeout(this.timer);
  };

  timer: TimeoutID;

  render() {
    return <Wrapper>{this.state.counter}</Wrapper>;
  }
}

export default hot(module)(App);

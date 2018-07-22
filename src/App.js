import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

const Wrapper = styled.div`
  font-size: 80px;
  font-family: Segoe UI;
`;

class App extends React.Component {
  state = {
    timer: 0,
  };

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    this.setState(
      prevState => ({ timer: prevState.timer + 4 }),
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

  render() {
    return <Wrapper>{this.state.timer}</Wrapper>;
  }
}

export default hot(module)(App);

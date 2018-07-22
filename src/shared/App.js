/** @flow */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { increaseCounter, decreaseCoutner } from '../redux/actions';
import ReactLogo from '../assets/images/react-logo.png';
import './globalStyles';

const AppWrapper = styled.div`
  width: 100%;

  div.heading {
    min-height: 350px;
    background: #272727;
    align-items: center;

    img {
      max-width: 500px;
      width: 100%;
    }
  }

  button {
    max-width: 200px;
    width: 100%;
    min-height: 42px;
    border: none;
    outline: none;
    background: none;
    color: white;
    font-family: RobotoBold;
  }

  .increase-wrapper,
  .decrease-wrapper {
    margin: 30px auto;
    align-items: center;
    max-width: 400px;
    width: 100%;

    input {
      max-width: 150px;
      min-height: 40px;
      border-width: 1px;
      margin: 0;
      padding: 0;
      font-family: RobotoRegular;
      font-size: 20px;
    }
  }

  .increase-wrapper {
    button {
      background: #118935;
    }
  }

  .decrease-wrapper {
    button {
      background: #d12a21;
    }
  }
`;

type Props = {
  increaseCounter: (step: number) => void,
  decreaseCoutner: (step: number) => void,
  counter: number,
};

type State = {
  increaseStep: number,
  decreaseStep: number,
};

class App extends React.Component<Props, State> {
  state = {
    increaseStep: 0,
    decreaseStep: 0,
  };

  handleIncreaseCoutner = (level: string) => () => {
    const { increaseStep, decreaseStep } = this.state;
    if (level === 'up') this.props.increaseCounter(increaseStep);
    else this.props.decreaseCoutner(decreaseStep);
  };

  handleStepChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: Number(value) });
  };

  render() {
    const { counter } = this.props;

    return (
      <AppWrapper>
        <div className="heading flex-center">
          <img src={ReactLogo} alt="ReactJS logo" />
        </div>
        <div>
          <span>{counter}</span>
          <div className="increase-wrapper flex-between">
            <button onClick={this.handleIncreaseCoutner('up')}>Increase counter by</button>
            <input type="text" name="increaseStep" onChange={this.handleStepChange} />
          </div>
          <div className="decrease-wrapper flex-between">
            <button onClick={this.handleIncreaseCoutner('down')}>Decrease counter by</button>
            <input type="text" name="decreaseStep" onChange={this.handleStepChange} />
          </div>
        </div>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter.counter,
  };
};

export default connect(
  mapStateToProps,
  {
    increaseCounter,
    decreaseCoutner,
  },
)(App);

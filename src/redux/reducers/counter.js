import merge from 'lodash/merge';
import * as ActionTypes from '../actions';

const initialTestState = {
  counter: 0,
};

/* eslint-disable indent */
export default function counter(state = initialTestState, action) {
  switch (action.type) {
    case ActionTypes.INCREASE_COUNTER:
      return merge({}, state, {
        counter: state.counter + action.step,
      });
    case ActionTypes.DECREASE_COUNTER:
      return merge({}, state, {
        counter: state.counter - action.step,
      });
    default:
      return state;
  }
}

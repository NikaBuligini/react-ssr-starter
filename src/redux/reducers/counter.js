import merge from 'lodash/merge';
import * as ActionTypes from '../actions';

const initialCounterState = {
  counter: 0,
};

export default function counter(state = initialCounterState, action) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return merge({}, state, {
        counter: state.counter + 1,
      });
    case ActionTypes.DECREMENT:
      return merge({}, state, {
        counter: state.counter - 1,
      });
    default:
      return state;
  }
}

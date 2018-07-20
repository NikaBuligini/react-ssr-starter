import merge from 'lodash';

const initialTestState = {
  value: 0,
};

export default function test(state = initialTestState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return merge({}, state, {
        value: state.value + 1,
      });
    case 'DECREMENT':
      return merge({}, state, {
        value: state.value - 1,
      });
    default:
      return state;
  }
}

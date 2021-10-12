import * as types from '../actionTypes';

export default (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE:
      return Number(action.value);
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUserState = {
  id: null,
  isAuthenticated: false,
  name: null,
};

export const user = createReducer(initialUserState, {
  [ActionTypes.AUTHENTICATE](state, action) {
    const { id, name } = action.user;
    return { ...state, isAuthenticated: true, id, name };
  },
  [ActionTypes.LOGOUT](state, action) {
    return { ...state, ...initialUserState };
  },
});

export default user;

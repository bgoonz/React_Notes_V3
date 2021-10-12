import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialItemsState = {
  list: null,
  requesting: false,
};

export const items = createReducer(initialItemsState, {
  [ActionTypes.FETCH_ITEMS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_ITEMS_SUCCESS](state, action) {
    return { ...state, list: action.response.items, requesting: false };
  },
  [ActionTypes.FETCH_ITEMS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default items;

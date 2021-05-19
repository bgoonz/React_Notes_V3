import * as ActionTypes from '../actionTypes';
import Items from '../../services/Items';

export const load = () => ({
  types: [
    ActionTypes.FETCH_ITEMS_REQUEST,
    ActionTypes.FETCH_ITEMS_SUCCESS,
    ActionTypes.FETCH_ITEMS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Items.get();
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

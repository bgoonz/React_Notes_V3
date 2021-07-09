import * as ActionTypes from '../actionTypes';

export const update = value => ({ type: ActionTypes.UPDATE, value });

export const increment = () => ({ type: ActionTypes.INCREMENT });

export const decrement = () => ({ type: ActionTypes.DECREMENT });

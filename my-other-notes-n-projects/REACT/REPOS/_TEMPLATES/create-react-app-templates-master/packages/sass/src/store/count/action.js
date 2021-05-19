import * as types from '../actionTypes';

export const update = value => ({ type: types.UPDATE, value });

export const increment = () => ({ type: types.INCREMENT });

export const decrement = () => ({ type: types.DECREMENT });

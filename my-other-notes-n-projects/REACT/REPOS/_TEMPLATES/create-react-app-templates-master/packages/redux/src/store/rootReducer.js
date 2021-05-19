import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import count from './count/reducer';
import items from './items/reducer';
import user from './user/reducer';

const root = combineReducers({
  router: routerReducer,
  count,
  items,
  user,
  ...loginReducer('loginForm'),
});

export default root;

import couterReducer from './counter';
import loggedReduces from './islogged';
import { combineReducers } from 'redux';
import printHelloReducer from './pringHelloWorldReducer';

const allReducers = combineReducers({
      counter : couterReducer,
      islogged : loggedReduces,
      data : printHelloReducer
});
export default allReducers;

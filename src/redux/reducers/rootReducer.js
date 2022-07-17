import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import masterReducer from './masterReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  toastr: toastrReducer,
  masterData: masterReducer
});

export default rootReducer;

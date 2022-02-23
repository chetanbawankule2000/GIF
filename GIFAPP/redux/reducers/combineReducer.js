// ---- PACKAGES ----
import {combineReducers} from 'redux';

// ---- REDUCERS ----
import apiReducer from './apiReducer';

const appReducer = combineReducers({
  //  use the 'keys' to refer to specific reducers like store.auth
  apidata: apiReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

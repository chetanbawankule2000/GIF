// ---- PACKAGES ----
import {createStore, compose} from 'redux';

// main reducer (combination of all reducers)
import rootReducer from './reducers/combineReducer';
//Importing midleware for using thunk..
import {applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(composeWithDevTools(applyMiddleware(thunk))),
);

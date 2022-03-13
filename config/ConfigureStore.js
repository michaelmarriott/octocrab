import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducer/Index';
import apiMiddleware from '../api/ApiMiddleware';
import mockApiMiddleware from '../api/MockApiMiddleware';

export default (intialState) => {
  let store = createStore(
      rootReducer,
      intialState,      
      compose(applyMiddleware(thunk,mockApiMiddleware,apiMiddleware)),
  );
  return { store }
}  

       
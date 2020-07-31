import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleware = [
  reduxThunk,
];

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store;

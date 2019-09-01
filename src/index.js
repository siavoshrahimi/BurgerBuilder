import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import createSageMiddleware from 'redux-saga';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './Store/Reducers/burgerBuilder';
import orderReducer from './Store/Reducers/order';
import authReducer from './Store/Reducers/auth';
import {watchAuth} from "./Store/Sagas/index";

const rootReducer = combineReducers({
  burgerBulider: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sageMiddleware = createSageMiddleware();

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk,sageMiddleware)));

sageMiddleware.run(watchAuth);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

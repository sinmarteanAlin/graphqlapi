import React from 'react';
import { createStore, applyMiddleware, compose } from "redux";
import ReactDOM from 'react-dom';
import { Router, browserHistory } from "react-router";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { default as routes } from './routes';
import rootReducer from "./reducers/index.js";
import './App.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

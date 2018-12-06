import React from 'react';
import { createStore, applyMiddleware, compose } from "redux";
import ReactDOM from 'react-dom';
import { Router, browserHistory } from "react-router";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { default as routes } from './routes';
import rootReducer from "./reducers/index.js";
import './App.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

const client = new ApolloClient({
    uri: 'https://movie-database-graphql-qwqnwstigc.now.sh/graphql'
})

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <Router history={browserHistory} routes={routes} />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);

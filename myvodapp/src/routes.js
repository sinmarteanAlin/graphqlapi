import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import cookie from 'react-cookies';
import { COOKIE_ISLOGGEDIN } from './constants/AppConstants';
import App from './components/App';
import LoggedOutLobby from "./components/loggedOut/LoggedOutLobby";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/loggedIn/home/Home";
import Category from "./components/loggedIn/category/Category";
import Movie from "./components/loggedIn/movie/Movie";
import FullCastAndCrew from "./components/loggedIn/movie/components/FullCastAndCrew";
import NoMatch from "./components/404/404";
import Search from "./components/loggedIn/search/Search";
import FavouriteMovies from './components/loggedIn/favouriteMovies/FavouriteMovies';
import MovieLists from './components/loggedIn/movieLists/MovieLists';
import Reviews from './components/loggedIn/movie/components/Reviews';
import Actors from './components/loggedIn/actors/Actors';

function requireAuth(nextState, replace) {
    if (!cookie.load(COOKIE_ISLOGGEDIN)) {
        replace({
            pathname: '/login'
        });
    }
}

function redirectIfLoggedIn(nextState, replace) {
    if (cookie.load(COOKIE_ISLOGGEDIN)) {
        replace({
            pathname: '/home'
        });
    }
}

export default (
    <Route exact path="/" component={App} >
        <IndexRoute component={LoggedOutLobby} onEnter={redirectIfLoggedIn} />
        <Route path="login" component={Login} onEnter={redirectIfLoggedIn} />
        <Route path="register" component={Register} onEnter={redirectIfLoggedIn} />
        <Route path="home" component={Home} onEnter={requireAuth} />
        <Route path="category/:id" component={Category} onEnter={requireAuth} />
        <Route path="movie/:id" component={Movie} onEnter={requireAuth} />
        <Route path="/full-cash-and-crew/:id" component={FullCastAndCrew} onEnter={requireAuth} />
        <Route path='/404' component={NoMatch} />
        <Route path='search' component={Search} onEnter={requireAuth} />
        <Route path='favourite-movies' component={FavouriteMovies} onEnter={requireAuth} />
        <Route path='movie-lists' component={MovieLists} onEnter={requireAuth} />
        <Route path='browse-reviews/:id' component={Reviews} onEnter={requireAuth} />
        <Route path='actors' component={Actors} onEnter={requireAuth} />

        <Redirect from='*' to='/404' />
    </Route>
);

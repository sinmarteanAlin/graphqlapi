import cookie from 'react-cookies';
import { COOKIE_ISLOGGEDIN, COOKIE_TOKEN } from '../constants/AppConstants';
import { startFetching, stopFetching } from './appActions';
import { handleFavouriteMovies } from '../components/common/js/handleFavouriteMovies';
import { getMovieData } from '../components/common/js/getMovieData';
import { enterUser } from '../components/common/js/enterUser';

import {
    register,
    login,
    logout,
    getFavMovies,
    addMovitToFav,
    removeMovieFromFav
} from '../api/ApiRequest';
import {
    logoutUser,
    userRegistered,
    getFavouriteMovies,
    addMovieToFavouritesType,
    removeMovieFromFavouritesType
} from './actionCreators/userActionCreators';

function logUserIn(json) {
    cookie.save(COOKIE_ISLOGGEDIN, true);
    cookie.save(COOKIE_TOKEN, json.token);
}

function logUserOut() {
    cookie.remove(COOKIE_ISLOGGEDIN);
    cookie.remove(COOKIE_TOKEN);
}

export const registerAUser = (username, email, password, repassword, successCb, errorCb) =>
    dispatch => {
        let registerArguments = {username, email, password, repassword};
        enterUser(dispatch, register, registerArguments, logUserIn, userRegistered, successCb, errorCb, logoutUser);
    };

export const loginAUser = (username, password, successCb, errorCb) =>
    dispatch => {
        let loginArguments = {username, password};
        enterUser(dispatch, login, loginArguments, logUserIn, userRegistered, successCb, errorCb, logoutUser);
    };

export const logoutAUser = (callback) =>
    dispatch => {
        dispatch(startFetching());
        logout(cookie.load(COOKIE_TOKEN)).subscribe(() => {
            logUserOut();
            dispatch(stopFetching());
            dispatch(logoutUser());
            callback();
        },
        () => {
            dispatch(stopFetching());
            callback();
        });
    };

export const getFavouriteMoviesFromUser = () =>
    dispatch => {
        getMovieData(dispatch, getFavMovies, null, getFavouriteMovies);
    };

export const addMovieToFavourites = (movieId, original_title, release_date, overview, poster_path) =>
    dispatch => {
        const favMovieArguments = {movieId, original_title, release_date, overview, poster_path};
        handleFavouriteMovies(dispatch, addMovitToFav, favMovieArguments, addMovieToFavouritesType);
    };

export const removeMovieFromFavourites = (movieId, original_title, release_date, overview, poster_path) =>
    dispatch => {
        const favMovieArguments = {movieId, original_title, release_date, overview, poster_path};
        handleFavouriteMovies(dispatch, removeMovieFromFav, favMovieArguments, removeMovieFromFavouritesType);
    };

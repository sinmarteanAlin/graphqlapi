import {
    USER_REGISTERED,
    LOGOUT_USER,
    GET_FAVOURITE_MOVIES,
    ADD_MOVIE_TO_FAVOURITES,
    REMOVE_MOVIE_FROM_FAVOURITES
} from '../actionTypes';

export function registerUser() {
    return {
        type: "REGISTER_USER_SUCCESS",
        payload: true
    };
};

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
};

export function userRegistered(data) {
    return {
        type: USER_REGISTERED,
        data
    };
}

export function getFavouriteMovies(data) {
    return {
        type: GET_FAVOURITE_MOVIES,
        data
    }
};

export function addMovieToFavouritesType(data) {
    return {
        type: ADD_MOVIE_TO_FAVOURITES,
        data
    }
};

export function removeMovieFromFavouritesType(data) {
    return {
        type: REMOVE_MOVIE_FROM_FAVOURITES,
        data
    }
};

import {
    GET_FAVOURITE_MOVIES,
    ADD_MOVIE_TO_FAVOURITES,
    REMOVE_MOVIE_FROM_FAVOURITES
} from '../actions/actionTypes';

export default function favouriteMoviesReducer(state = {}, action) {
    switch(action.type) {
        case GET_FAVOURITE_MOVIES:
        case ADD_MOVIE_TO_FAVOURITES:
        case REMOVE_MOVIE_FROM_FAVOURITES:
            return {
                ...state,
                ...action.data,
            };

        default: return state;
    }
}

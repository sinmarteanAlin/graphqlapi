import {
    GET_DIFFERENT_MOVIE_LISTS
} from '../actions/actionTypes';

export default function differentMoviesListReducer(state = {}, action) {
    switch(action.type) {
        case GET_DIFFERENT_MOVIE_LISTS:
            return {
                ...state,
                ...action.data,
            };
        default: return state;
    }
}

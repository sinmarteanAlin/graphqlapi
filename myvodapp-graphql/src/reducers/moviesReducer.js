import * as types from '../actions/actionTypes';

export default function moviesReducer(state = {}, action) {
    switch(action.type) {
        case types.GET_MOVIE_GENRE_DETAILS:
            return {
                ...state,
                ...action.data,
            };
        default: return state;
    }
}

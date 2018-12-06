import * as types from '../actions/actionTypes';

export default function similarMoviesReducer(state = {}, action) {
    switch(action.type) {
        case types.GET_SIMILAR_MOVIES:
            return {
                ...state,
                ...action.data,
            };
        default: return state;
    }
}

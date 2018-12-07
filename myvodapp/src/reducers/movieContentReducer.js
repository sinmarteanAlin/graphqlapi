import * as types from "../actions/actionTypes";

export default function movieContentReducer(state = null, action) {
    switch(action.type) {
        case types.GET_MOVIE_DETAILS:
            return {
                ...state,
                ...action.data
            };

        default: return state;
    }
}

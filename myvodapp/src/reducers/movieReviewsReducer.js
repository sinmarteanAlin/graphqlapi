import * as types from "../actions/actionTypes";

export default function movieReviewsReducer(state = null, action) {
    switch(action.type) {
        case types.GET_MOVIE_REVIEWS:
            return {
                ...state,
                ...action.data
            };

        default: return state;
    }
}

import * as types from "../actions/actionTypes";

export default function movieCategoryReducer(state = null, action) {
    switch(action.type) {
        case types.GET_MOVIE_GENRES:
            return {
                ...state,
                ...action.data,
            };
        default: return state;
    }
}

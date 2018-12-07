import * as types from "../actions/actionTypes";

export default function movieSearchReducer(state = [], action) {
    switch(action.type) {
        case types.SEARCH_MOVIE:
            return [
                ...action.data
            ];

        default: return state;
    }
}

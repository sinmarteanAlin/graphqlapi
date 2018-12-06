import * as types from '../actions/actionTypes';

export default function popularACtorsReducer(state = {}, action) {
    switch(action.type) {
        case types.GET_POPULAR_ACTORS:
            return {
                ...state,
                ...action.data,
            };
        default: return state;
    }
}

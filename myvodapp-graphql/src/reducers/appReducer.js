import {
    START_FETCHING,
    STOP_FETCHING
} from '../actions/actionTypes';

const initialState = {
    isFetching: false
};

export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case START_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            }
        default: return state;
    }
}

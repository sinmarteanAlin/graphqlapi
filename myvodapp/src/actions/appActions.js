import {
    START_FETCHING,
    STOP_FETCHING
} from './actionTypes';

export function startFetching() {
    return {
        type: START_FETCHING
    };
}

export function stopFetching() {
    return {
        type: STOP_FETCHING
    };
}

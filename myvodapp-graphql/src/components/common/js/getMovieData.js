import { startFetching, stopFetching } from '../../../actions/appActions';
import cookie from 'react-cookies';
import { COOKIE_TOKEN } from '../../../constants/AppConstants';

/*
    1-st argument ---dispatcher
    2-nd argument -- action to be called
    3-rd argument -- function argument
    4-th argument -- action creator function
*/

export const getMovieData = (dispatch, action, actionArgument, actionCreator) => {
    dispatch(startFetching());
    action(actionArgument, cookie.load(COOKIE_TOKEN))
    .subscribe(
        ({ json }) => {
            dispatch(actionCreator(json));
            dispatch(stopFetching());
        },
        ( err ) => {
            dispatch(stopFetching());
        }
    )
}

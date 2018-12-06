import { startFetching, stopFetching } from '../../../actions/appActions';
import cookie from 'react-cookies';
import { COOKIE_TOKEN } from '../../../constants/AppConstants';

/*
    handle add/remove to/from favourite movies
    1'st arg -- dispatch
    2'nd arg -- action

*/

export const handleFavouriteMovies = (dispatch, action, actionArgs, actionType) => {
    dispatch(startFetching());
    const token = cookie.load(COOKIE_TOKEN);
    const {
        movieId,
        original_title,
        release_date,
        overview,
        poster_path
    } = actionArgs;

    action({
        token,
        movieId,
        original_title,
        release_date,
        overview,
        poster_path
    }).subscribe(
        ({ json }) => {
            dispatch(stopFetching());
            dispatch(actionType(json));
        },
    () => dispatch(stopFetching()));
}

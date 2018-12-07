import { startFetching, stopFetching } from '../../../actions/appActions';

/*
    generic function for login/register user
*/

export const enterUser = (dispatch, action, actionArguments, actionCreator, userRegistered, successCb, errorCb, logoutUser) => {
    dispatch(startFetching());

    const {
        username,
        email,
        password,
        repassword
    } = actionArguments;

    action({
        username,
        email,
        password,
        repassword
    }).subscribe(
        ({ json }) => {
            actionCreator(json);
            dispatch(stopFetching());
            dispatch(userRegistered(json));
            successCb(logoutUser());
        },
        (err) => {
            errorCb(err);
            dispatch(stopFetching());
        }
    )
}

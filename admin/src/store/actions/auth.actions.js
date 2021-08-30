import {AUTH_SAVE_TOKEN, AUTH_SAVE_USER, TOKEN_IN_LOCAL, USER_IN_LOCAL} from '../constants';

function saveToken(token) {
    return (dispatch) => {
        localStorage.setItem(TOKEN_IN_LOCAL, JSON.stringify(token));
        return dispatch({type: AUTH_SAVE_TOKEN, payload:token});
    };
}

function saveUser(user)
{
    return (dispatch) => {
        localStorage.setItem(USER_IN_LOCAL, JSON.stringify(user));
        return dispatch({type:AUTH_SAVE_USER, payload:user});
    }
}

export const authActions = {
    saveToken,
    saveUser
};

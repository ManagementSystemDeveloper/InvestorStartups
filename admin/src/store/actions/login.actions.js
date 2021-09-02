import axios from "axios";
import { loadingActions, toastActions } from ".";
import {LOGIN_URL} from './../constants/api.constants';
import { authActions } from "./auth.actions";
import {history} from '../../helpers/history';


function login(email, password) {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("login start"));
        axios.post(LOGIN_URL, 
            {
                email:email,
                password:password
            })
            .then((res) => {
                dispatch(loadingActions.hideLoading());
                dispatch(authActions.saveToken(res.data.token));
                dispatch(authActions.saveUser(res.data.user));
                history.push({pathname:'/investor/all'});             
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    };
}

function logout() {
    return (dispatch) => {
        dispatch(authActions.removeToken());
        history.push({pathname:'/login'});
    }
}

export const loginActions = {
    login,
    logout,
};

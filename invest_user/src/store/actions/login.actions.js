import axios from "axios";
import { loadingActions, toastActions } from ".";
import { LOGIN_URL, CHANGE_PASSWORD_URL } from './../constants/api.constants';
import { authActions } from "./auth.actions";
import {history} from '../../helpers/history';
import getDefaultBearerConfig from "../../helpers/axios_config";

function login(email, password) {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Login start"));
        axios.post(LOGIN_URL, 
            {
                email:email,
                password:password
            })
            .then((res) => {
                dispatch(loadingActions.hideLoading());
                dispatch(authActions.saveToken(res.data.token));
                dispatch(authActions.saveUser(res.data.user));
                history.push({pathname:'/dashboard'});             
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    };
}

function changePassword(token, id, password) {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Changing password"));
        const reqBody = {
            id:id,
            password:password
        };
        axios.post(CHANGE_PASSWORD_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(loadingActions.hideLoading());
                history.push({pathname:'/dashboard'});             
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
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
    changePassword,
};

import axios from "axios";
import { CREATE_INVESTOR_URL, UPDATE_INVESTOR_PROFILE_URL, 
    CREATE_DONE_SUCCESS, GET_ALL_INVESTOR_URL, UPDATE_INVESTOR_PASSWORD_URL,
    INVESTOR_LIST_ALL, UPDATE_INVESTOR_DELETE_URL } from "../constants/index";
import getDefaultBearerConfig from "../../helpers/axios_config";
import {toastActions} from './index';
import { loadingActions } from "./loading.actions";

const createInvestor = (user_name, email, password, token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Creating new user"));
        var reqBody = {
            name:user_name, 
            email: email,
            password: password
        };

        axios.post(CREATE_INVESTOR_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("User created successfully"));
                dispatch({ type:CREATE_DONE_SUCCESS, payload:true });
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const getAllInvestor = (token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading users"));
        
        axios.get(GET_ALL_INVESTOR_URL, getDefaultBearerConfig(token))
            .then((res) => {
                console.log(res);
                dispatch({type:INVESTOR_LIST_ALL, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const updateInvestor = (token, id, user_name, email ) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Update user"));
        var reqBody = {
            id:id,
            name:user_name, 
            email: email
        };

        axios.post(UPDATE_INVESTOR_PROFILE_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                console.log(res);
                dispatch(toastActions.showToast("User updated successfully"));
                dispatch(getAllInvestor(token));
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const updatePassword = (token, id, password) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Update password"));
        var reqBody = {
            id:id,
            password:password,
        };
        axios.post(UPDATE_INVESTOR_PASSWORD_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Password updated successfully"));
                dispatch(getAllInvestor(token));
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const deleteInvestor = (token, id) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Delete Investor"));
        var reqBody = {
            id:id
        };
        axios.post(UPDATE_INVESTOR_DELETE_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Investor deleted successfully"));
                dispatch(getAllInvestor(token));
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}


export const investorActions = {
    createInvestor,
    getAllInvestor,
    updateInvestor,
    updatePassword,
    deleteInvestor
};

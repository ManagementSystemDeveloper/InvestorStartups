import axios from "axios";
import { GET_ALL_UPDATE_URL, UPDATE_LIST_ALL, CREATE_UPDATE_URL, CREATE_DONE_SUCCESS, UPDATE_LIST_UPDATED, GET_UPDATE_URL, UPDATE_LIST } from "../constants/index";
import getDefaultBearerConfig from "../../helpers/axios_config";
import {toastActions} from './index';
import { loadingActions } from "./loading.actions";
import { DOWNLOAD_URL } from '../../store/constants';
import fileDownload from 'downloadjs';

const addUpdate = (formData, token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Creating new update"));

        axios.post(CREATE_UPDATE_URL, formData, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Update created successfully"));
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

const getUpdatesByStartUpId = (token, company_id) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading updates"));
        let config = {
            headers: getDefaultBearerConfig(token).headers,
            params: {
                company_id: company_id
            },
        };
        
        axios.get(GET_ALL_UPDATE_URL, config)
            .then((res) => {
                dispatch({type:UPDATE_LIST_ALL, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const getUpdateById = (token, id) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading updates"));
        let config = {
            headers: getDefaultBearerConfig(token).headers,
            params: {
                id: id
            },
        };
        
        axios.get(GET_UPDATE_URL, config)
            .then((res) => {
                dispatch({type:UPDATE_LIST, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const stopUpdateUI = () => {
    return dispatch => {
        dispatch({type:UPDATE_LIST_UPDATED});
    }
}

const download_file = (token, id, filename) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Waiting download..."));
        let config = {
            key: 'value',
            headers: getDefaultBearerConfig(token).headers,
            responseType: 'blob'
        };
        
        axios.post(DOWNLOAD_URL, { id: id }, config)
            .then((res) => {
                fileDownload(res.data, filename);
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

export const updateAction = {
    getUpdatesByStartUpId,
    addUpdate,
    stopUpdateUI,
    download_file,
    getUpdateById,
};
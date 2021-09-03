import axios from "axios";
import { GET_INVESTMENT_URL, INVESTMENT_LIST, UPDATE_LIST_UPDATED, DOWNLOAD_URL } from "../constants/index";
import getDefaultBearerConfig from "../../helpers/axios_config";
import {toastActions} from './index';
import { loadingActions } from "./loading.actions";
import fileDownload from 'downloadjs';

const getInvestmentByUserId = (token, id) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading investments"));
        
        const config = {
            headers: getDefaultBearerConfig(token).headers,
            params: {
                id: id
            }
        };
        axios.get(GET_INVESTMENT_URL, config)
            .then((res) => {
                dispatch({type:INVESTMENT_LIST, payload:res.data});
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

export const investmentActions = {
    getInvestmentByUserId,
    stopUpdateUI,
    download_file,
};
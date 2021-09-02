import axios from "axios";
import { CREATE_COMPANY_URL, CREATE_DONE_SUCCESS, GET_ALL_COMPANY_URL, COMPANY_LIST_ALL, UPDATE_COMPANY_URL, UPDATE_COMPANY_FILE_URL, UPDATE_COMPANY_DELETE_URL, GET_COMPANY_URL, COMPANY_LIST } from "../constants/index";
import getDefaultBearerConfig from "../../helpers/axios_config";
import {toastActions} from './index';
import { loadingActions } from "./loading.actions";

const createCompany = (formData, token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Creating new company"));

        axios.post(CREATE_COMPANY_URL, formData, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Company created successfully"));
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

const getAllCompany = (token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading users"));
        
        axios.get(GET_ALL_COMPANY_URL, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch({type:COMPANY_LIST_ALL, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const getCompanyByUserId = (token, id) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading companies"));
        
        const config = {
            headers: getDefaultBearerConfig(token).headers,
            params: {
                id: id
            }
        };
        axios.get(GET_COMPANY_URL, config)
            .then((res) => {
                dispatch({type:COMPANY_LIST, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const updateCompanyWithFile = (token, formData, bw) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Update company"));

        axios.post(UPDATE_COMPANY_FILE_URL, formData, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Company updated successfully"));
                if(bw){
                    dispatch(getCompanyByUserId(token, bw));
                } else {
                    dispatch(getAllCompany(token));
                }
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const updateCompany = (token, id, name, website, bw) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Update company"));
        var reqBody = {
            id: id,
            name: name, 
            website: website
        };

        axios.post(UPDATE_COMPANY_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Company updated successfully"));
                if(bw){
                    dispatch(getCompanyByUserId(token, bw));
                } else {
                    dispatch(getAllCompany(token));
                }
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

const deleteCompany = (token, id, bw) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Delete company"));
        var reqBody = {
            id:id
        };
        axios.post(UPDATE_COMPANY_DELETE_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                console.log(res);
                dispatch(toastActions.showToast("Company deleted successfully"));
                if(bw){
                    dispatch(getCompanyByUserId(token, bw));
                } else {
                    dispatch(getAllCompany(token));
                }
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}


export const companyActions = {
    createCompany,
    getAllCompany,
    updateCompany,
    updateCompanyWithFile,
    deleteCompany,
    getCompanyByUserId,
};

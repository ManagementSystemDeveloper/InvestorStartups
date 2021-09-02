import axios from "axios";
import { CREATE_INVESTMENT_URL, CREATE_DONE_SUCCESS, GET_ALL_INVESTMENT_URL, INVESTMENT_LIST_ALL, UPDATE_INVESTMENT_URL, UPDATE_INVESTMENT_DELETE_URL, GET_INVESTMENT_URL, INVESTMENT_LIST } from "../constants/index";
import getDefaultBearerConfig from "../../helpers/axios_config";
import {toastActions} from './index';
import { loadingActions } from "./loading.actions";

const createInvestment = (date, units, class_of_unit, shares, underlying_share_class, startUp, unit_holder, token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Creating new investment"));
        var date_info = new Date(date);
        var d = date_info.getDate();
        var m = date_info.getMonth() + 1;
        var y = date_info.getFullYear();
        var full_date = m + '/' + d + '/' + y;

        var reqBody = {
            issue_date:full_date, 
            unit_holder_id: unit_holder,
            company_id: startUp,
            units: units,
            class_of_unit: class_of_unit,
            shares: shares,
            underlying_share_class: underlying_share_class
        };

        axios.post(CREATE_INVESTMENT_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Investment created successfully"));
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

const getAllInvestment = (token) => {
    return (dispatch) => {
        dispatch(loadingActions.showLoading("Loading investments"));
        
        axios.get(GET_ALL_INVESTMENT_URL, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch({type:INVESTMENT_LIST_ALL, payload:res.data});
                dispatch(loadingActions.hideLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(toastActions.showToast("Error. Try again."));
                dispatch(loadingActions.hideLoading());
            });
    }
}

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

const updateInvestment = (token, id, date, units, class_of_unit, shares, underlying_share_class, startUp, unit_holder, bw ) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Update investment"));
        var date_info = new Date(date);
        var d = date_info.getDate();
        var m = date_info.getMonth() + 1;
        var y = date_info.getFullYear();
        var full_date = m + '/' + d + '/' + y;

        var reqBody = {
            id: id,
            issue_date: full_date, 
            units: units,
            class_of_unit: class_of_unit,
            shares: shares,
            underlying_share_class: underlying_share_class,
            company_id: startUp,
            unit_holder_id: unit_holder
        };

        axios.post(UPDATE_INVESTMENT_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Investment updated successfully"));
                if(bw){
                    dispatch(getInvestmentByUserId(token, bw));
                } else {
                    dispatch(getAllInvestment(token));
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

const deleteInvestment = (token, id, bw) => {
    return dispatch => {
        dispatch(loadingActions.showLoading("Delete Investment"));
        var reqBody = {
            id:id
        };
        axios.post(UPDATE_INVESTMENT_DELETE_URL, reqBody, getDefaultBearerConfig(token))
            .then((res) => {
                dispatch(toastActions.showToast("Investment deleted successfully"));
                if(bw){
                    dispatch(getInvestmentByUserId(token, bw));
                } else {
                    dispatch(getAllInvestment(token));
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

export const investmentActions = {
    createInvestment,
    getAllInvestment,
    updateInvestment,
    deleteInvestment,
    getInvestmentByUserId,
};
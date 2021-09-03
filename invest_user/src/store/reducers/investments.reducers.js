import { INVESTMENT_LIST, UPDATE_LIST_UPDATED } from "../constants"

const initialState = {investments:[]}
export const investmentReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case INVESTMENT_LIST:
            return {investments : action.payload, needRefresh:true};
        case UPDATE_LIST_UPDATED:
            return {...state, needRefresh:false};
        default:
            return state;
    }
}
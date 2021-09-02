import { INVESTMENT_LIST_ALL, INVESTMENT_LIST } from "../constants"

const initialState = {investments:[]}
export const investmentReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case INVESTMENT_LIST_ALL:
            return {investments : action.payload};
        case INVESTMENT_LIST:
            return {investments : action.payload};
        default:
            return state;
    }
}
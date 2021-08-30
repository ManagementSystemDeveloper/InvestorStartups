import { COMPANY_LIST_ALL } from "../constants"

const initialState = {companies:[]}
export const companyReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case COMPANY_LIST_ALL:
            return {companies : action.payload};
        default:
            return state;
    }
}
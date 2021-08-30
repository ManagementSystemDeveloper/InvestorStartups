import { INVESTOR_LIST_ALL } from "../constants"

const initialState = {investors:[]}
export const investorsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case INVESTOR_LIST_ALL:
            return {investors : action.payload};
        default:
            return state;
    }
}

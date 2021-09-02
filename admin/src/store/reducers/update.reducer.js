import { UPDATE_LIST_ALL, UPDATE_LIST_UPDATED, UPDATE_LIST } from "../constants"

const initialState = {updates:[], needRefresh:false}
export const updateReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case UPDATE_LIST_ALL:
            return {updates : action.payload, needRefresh:true};
        case UPDATE_LIST_UPDATED:
            return {...state, needRefresh:false};
        case UPDATE_LIST:
            return {update : action.payload};
        default:
            return state;
    }
}
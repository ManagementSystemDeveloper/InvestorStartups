import { CREATE_DONE_SUCCESS } from "../constants"

const initialState = {create_success_clear_form:false}
export const createReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CREATE_DONE_SUCCESS:
            return {create_success_clear_form : action.payload};
        default:
            return state;
    }
}

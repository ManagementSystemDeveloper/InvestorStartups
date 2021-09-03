import { TOKEN_IN_LOCAL,USER_IN_LOCAL, AUTH_SAVE_TOKEN, AUTH_SAVE_USER } from "../constants"

const initialState = {token:JSON.parse(localStorage.getItem(TOKEN_IN_LOCAL)), user:JSON.parse(localStorage.getItem(USER_IN_LOCAL))}
export const authReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case AUTH_SAVE_TOKEN:
            return {...state, token:action.payload};
        case AUTH_SAVE_USER:
            return {...state, user:action.payload};
        default:
            return state;
    }
}

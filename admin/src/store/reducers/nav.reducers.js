import { UPDATE_NAV_MENU_ACTIVE, NAV_INVESTOR_ALL } from "../constants"

export const navReducer = (state={cur_nav: NAV_INVESTOR_ALL}, action) => {
    switch(action.type)
    {
        case UPDATE_NAV_MENU_ACTIVE:
            return {cur_nav: action.payload}
        default:
            return state;
    }
}

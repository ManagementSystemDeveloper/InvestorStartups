
import {UPDATE_NAV_MENU_ACTIVE} from '../constants';

function updateNav(currentNavConst) {
    return (dispatch) => {
        return {type: UPDATE_NAV_MENU_ACTIVE, payload:currentNavConst}        
    };
}

export const navActions = {
    updateNav
};

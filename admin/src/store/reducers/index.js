import { combineReducers } from 'redux';
import { navReducer } from './nav.reducers';
import { loadingReducer } from './loading.reducers';
import { toastReducer } from './toast.reducers';
import { authReducer } from './auth.reducers';
import {createReducer} from './create.reducer';
import {investorsReducer} from './investors.reducers';

const reducers = combineReducers({
    navReducer, 
    loadingReducer,
    toastReducer,
    authReducer,
    createReducer,
    investorsReducer
});

export default reducers; 

import { combineReducers } from 'redux';
import { loadingReducer } from './loading.reducers';
import { toastReducer } from './toast.reducers';
import { authReducer } from './auth.reducers';
import { investmentReducer } from './investments.reducers';
const reducers = combineReducers({
    loadingReducer,
    toastReducer,
    authReducer,
    investmentReducer,
});

export default reducers; 

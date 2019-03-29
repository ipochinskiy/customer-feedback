import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import {
    FEEDBACK_FEATURE,
    reducer as feedbackReducer,
} from './feedback';

export const createReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    [ FEEDBACK_FEATURE ]: feedbackReducer,
});

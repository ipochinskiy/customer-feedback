import { combineReducers } from 'redux';

import {
    FEEDBACK_FEATURE,
    reducer as feedbackReducer,
} from './feedback';

export const reducer = combineReducers({
    [ FEEDBACK_FEATURE ]: feedbackReducer,
});

import { combineReducers } from 'redux';

import { reducer as feedbackReducer } from './feedback';

export const reducer = combineReducers({
    feedback: feedbackReducer,
});

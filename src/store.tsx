import {
    Action,
    applyMiddleware,
    createStore,
} from 'redux';

import { StoreState as FeedbackStoreState } from './feedback';
import { reducer } from './reducer';

interface StoreState {
    feedback: FeedbackStoreState,
}

const logger = (store: any) => (next: any) => (action: Action) => {
    const result = next(action);

    console.group(action.type);
    console.log('%c  [State Debug] action', 'color: #03A9F4; font-weight: bold', action);
    console.log('%c  [State Debug] state after', 'color: #4CAF50; font-weight: bold', store.getState());
    console.groupEnd();

    return result;
}

export const store = createStore<StoreState, any, any, any>(
    reducer,
    applyMiddleware(logger),
);

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {
    Action,
    applyMiddleware,
    createStore,
} from 'redux';

import createSagaMiddleware from '@redux-saga/core';

import {
    feedbackSaga,
    StoreState as FeedbackStoreState,
} from './feedback';
import { createReducer } from './reducer';

interface StoreState {
    feedback: FeedbackStoreState,
    router: any,
}

const logger = (store: any) => (next: any) => (action: Action) => {
    const result = next(action);

    console.group(action.type);
    console.log('%c  [State Debug] action', 'color: #03A9F4; font-weight: bold', action);
    console.log('%c  [State Debug] state after', 'color: #4CAF50; font-weight: bold', store.getState());
    console.groupEnd();

    return result;
}

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore<StoreState, any, any, any>(
    createReducer(history),
    applyMiddleware(logger, sagaMiddleware, routerMiddleware(history)),
);

sagaMiddleware.run(feedbackSaga);

import { Action } from 'redux';

import { Customer } from './_domain/Customer';

export const Actions = {
    FEEDBACK_LOADED:                 '[Feedback] Feedback Loaded',
    CUSTOMER_LIST_LOADED:            '[Feedback] Customer List Loaded',
    CUSTOMER_LIST_LOADING_FAILED:    '[Feedback] Customer List Loading Failed',
};

export interface FeedbackLoadedAction extends Action {
    type: typeof Actions.FEEDBACK_LOADED;
}

export function feedbackLoaded(): FeedbackLoadedAction {
    return {
        type: Actions.FEEDBACK_LOADED,
    };
}

export interface CustomerListLoadedAction extends Action {
    type: typeof Actions.CUSTOMER_LIST_LOADED;
    payload: { customerList: Customer[] };
}

export function customerListLoaded(customerList: Customer[] = []): CustomerListLoadedAction {
    return {
        type: Actions.CUSTOMER_LIST_LOADED,
        payload: { customerList },
    };
}

export interface CustomerListLoadingFailedAction extends Action {
    type: typeof Actions.CUSTOMER_LIST_LOADING_FAILED;
    payload: { error: string };
}

export function customerListLoadingFailed(error: string): CustomerListLoadingFailedAction {
    return {
        type: Actions.CUSTOMER_LIST_LOADING_FAILED,
        payload: { error },
    };
}

export type ActionTypes =
    | CustomerListLoadedAction
    | FeedbackLoadedAction
    | CustomerListLoadingFailedAction
;

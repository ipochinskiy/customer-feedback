import { Action } from 'redux';

import { Customer } from './_domain/Customer';
import { Feedback } from './_domain/Feedback';

export const Actions = {
    FEEDBACK_LOADED:                 '[Feedback] Feedback Loaded',
    CUSTOMER_LIST_LOADED:            '[Feedback] Customer List Loaded',
    CUSTOMER_LIST_LOADING_FAILED:    '[Feedback] Customer List Loading Failed',
    NEW_CUSTOMER_ADD_STARTED:        '[Feedback] New Customer Add Started',
    NEW_CUSTOMER_ADD_ENDED:          '[Feedback] New Customer Add Ended',
    NEW_CUSTOMER_ADD_FAILED:         '[Feedback] New Customer Add Failed',
    NEW_FEEDBACK_ADD_STARTED:        '[Feedback] New Feedback Add Started',
    NEW_FEEDBACK_ADD_ENDED:          '[Feedback] New Feedback Add Ended',
    NEW_FEEDBACK_ADD_FAILED:         '[Feedback] New Feedback Add Failed',
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

export interface NewCustomerAddStartedAction extends Action {
    type: typeof Actions.NEW_CUSTOMER_ADD_STARTED;
    payload: { customerName: string };
}

export function newCustomerAddStarted(customerName: string): NewCustomerAddStartedAction {
    return {
        type: Actions.NEW_CUSTOMER_ADD_STARTED,
        payload: { customerName },
    };
}

export interface NewCustomerAddEndedAction extends Action {
    type: typeof Actions.NEW_CUSTOMER_ADD_ENDED;
    payload: { customer: Customer };
}

export function newCustomerAddEnded(customer: Customer): NewCustomerAddEndedAction {
    return {
        type: Actions.NEW_CUSTOMER_ADD_ENDED,
        payload: { customer },
    };
}

export interface NewCustomerAddFailedAction extends Action {
    type: typeof Actions.NEW_CUSTOMER_ADD_FAILED;
    payload: { error: string };
}

export function newCustomerAddFailed(error: string): NewCustomerAddFailedAction {
    return {
        type: Actions.NEW_CUSTOMER_ADD_FAILED,
        payload: { error },
    };
}

export interface NewFeedbackAddStartedAction extends Action {
    type: typeof Actions.NEW_FEEDBACK_ADD_STARTED;
    payload: { feedbackText: string, customerId: string };
}

export function newFeedbackAddStarted(feedbackText: string, customerId: string): NewFeedbackAddStartedAction {
    return {
        type: Actions.NEW_FEEDBACK_ADD_STARTED,
        payload: { feedbackText, customerId },
    };
}

export interface NewFeedbackAddEndedAction extends Action {
    type: typeof Actions.NEW_FEEDBACK_ADD_ENDED;
    payload: { feedback: Feedback, customerId: string };
}

export function newFeedbackAddEnded(feedback: Feedback, customerId: string): NewFeedbackAddEndedAction {
    return {
        type: Actions.NEW_FEEDBACK_ADD_ENDED,
        payload: { feedback, customerId },
    };
}

export interface NewFeedbackAddFailedAction extends Action {
    type: typeof Actions.NEW_FEEDBACK_ADD_FAILED;
    payload: { error: string };
}

export function newFeedbackAddFailed(error: string): NewFeedbackAddFailedAction {
    return {
        type: Actions.NEW_FEEDBACK_ADD_FAILED,
        payload: { error },
    };
}

export type ActionTypes =
    | CustomerListLoadedAction
    | FeedbackLoadedAction
    | CustomerListLoadingFailedAction
    | NewCustomerAddStartedAction
    | NewCustomerAddEndedAction
    | NewCustomerAddFailedAction
    | NewFeedbackAddStartedAction
    | NewFeedbackAddEndedAction
    | NewFeedbackAddFailedAction
;

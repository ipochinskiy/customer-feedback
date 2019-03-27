import { Action } from 'redux';

export const Actions = {
    FEEDBACK_LOADED:                 '[Feedback] Feedback loaded',
};

export class FeedbackLoadedAction implements Action {
    type = Actions.FEEDBACK_LOADED;
}

export type ActionTypes =
    | FeedbackLoadedAction
;

import { Action } from 'redux';

export const Actions = {
    FEEDBACK_LOADED:                 '[Feedback] Feedback loaded',
};

interface FeedbackLoadedAction extends Action {
    type: typeof Actions.FEEDBACK_LOADED;
}

export function feedbackLoaded(): FeedbackLoadedAction {
    return {
        type: Actions.FEEDBACK_LOADED,
    };
}

export type ActionTypes =
    | FeedbackLoadedAction
;

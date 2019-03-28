import {
    call,
    put,
} from 'redux-saga/effects';
import { v4 } from 'uuid';

import { Feedback } from '../_domain/Feedback';
import {
    newFeedbackAddEnded,
    newFeedbackAddFailed,
    NewFeedbackAddStartedAction,
} from '../actions';

export function* addFeedback(action: NewFeedbackAddStartedAction) {
    try {
        const { feedbackText, customerId } = action.payload;
        const feedback = yield call(sendFeedback, feedbackText);
        yield put(newFeedbackAddEnded(feedback, customerId));
    } catch (error) {
        yield put(newFeedbackAddFailed(error.message));
    }
}

function sendFeedback(feedbackText: string): Promise<Feedback> {
    return Promise.resolve({
        id: v4(),
        text: feedbackText,
    });
}

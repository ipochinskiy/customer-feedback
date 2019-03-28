import {
    all,
    takeLatest,
} from 'redux-saga/effects';

import { Actions } from '../actions';
import { loadCustomerList } from './load-customer-list';

export function* feedbackSaga() {
    yield all([
        takeLatest(Actions.FEEDBACK_LOADED, loadCustomerList),
    ]);
}
import {
    all,
    takeLatest,
} from 'redux-saga/effects';

import { Actions } from '../actions';
import { addCustomer } from './add-customer';
import { addFeedback } from './add-feedback';
import { loadCustomerList } from './load-customer-list';

export function* feedbackSaga() {
    yield all([
        takeLatest(Actions.FEEDBACK_LOADED, loadCustomerList),
        takeLatest(Actions.NEW_CUSTOMER_ADD_STARTED, addCustomer),
        takeLatest(Actions.NEW_FEEDBACK_ADD_STARTED, addFeedback),
    ]);
}

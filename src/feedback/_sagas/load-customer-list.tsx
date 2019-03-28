import {
    call,
    put,
} from 'redux-saga/effects';

import {
    customerListLoaded,
    customerListLoadingFailed,
} from '../actions';

export function* loadCustomerList() {
    try {
        const questionList = yield call(fetchData);
        yield put(customerListLoaded(questionList));
    } catch (error) {
        yield put(customerListLoadingFailed(error.message));
    }
}

function fetchData() {
    return fetch('/data.json')
        .then(response => response.json());
}

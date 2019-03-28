import {
    call,
    put,
} from 'redux-saga/effects';
import { v4 } from 'uuid';

import { Customer } from '../_domain/Customer';
import {
    newCustomerAddEnded,
    newCustomerAddFailed,
    NewCustomerAddStartedAction,
} from '../actions';

export function* addCustomer(action: NewCustomerAddStartedAction) {
    try {
        const { customerName } = action.payload;
        const customer = yield call(sendCustomer, customerName);
        yield put(newCustomerAddEnded(customer));
    } catch (error) {
        yield put(newCustomerAddFailed(error.message));
    }
}

function sendCustomer(customerName: string): Promise<Customer> {
    return Promise.resolve({
        id: v4(),
        name: customerName,
        photo: `http://lorempixel.com/50/50/cats/${Math.floor(Math.random() * 100)}`,
        feedbackList: [],
    });
}

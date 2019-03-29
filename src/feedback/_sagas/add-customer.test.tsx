import { push } from 'connected-react-router';
import {
    put,
    StrictEffect,
} from 'redux-saga/effects';

import { SagaIterator } from '@redux-saga/core';

import {
    newCustomerAddEnded,
    newCustomerAddFailed,
    newCustomerAddStarted,
} from '../actions';
import { addCustomer } from './add-customer';

const { objectContaining, stringMatching, stringContaining } = expect;

describe('Saga: addCustomer', () => {
    let iterator: SagaIterator;

    beforeEach(() => {
        iterator = addCustomer(newCustomerAddStarted('Captain Marvel'));
    });

    describe('with a successful server request', () => {
        let next: IteratorResult<StrictEffect<any>>;

        beforeEach(() => {
            next = iterator.next();
            next = iterator.next({ id: 'capM', name: 'Captain Marvel' });
        });

        it(`should dispatch an action with the new customer object in it's payload`, () => {

            expect(next).toMatchObject({
                done: false,
                value: put(newCustomerAddEnded(objectContaining({
                    id: 'capM',
                    name: 'Captain Marvel',
                }))),
            });
        });

        it(`should redirect to the created customer`, () => {

            next = iterator.next();

            expect(next).toMatchObject({
                done: false,
                value: put(push('/customers/capM')),
            });
        });
    });

    describe('with a failed server request', () => {
        it(`should disaptch an action with the error message in it's payload`, () => {
            const error = new Error('kaboom!');

            let next = iterator.next();
            next = iterator.throw(error);

            expect(next).toMatchObject({
                done: false,
                value: put(newCustomerAddFailed('kaboom!')),
            });
        });
    });
});

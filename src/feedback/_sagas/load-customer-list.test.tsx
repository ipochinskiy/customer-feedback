import { put } from 'redux-saga/effects';

import { SagaIterator } from '@redux-saga/core';

import { Customer } from '../_domain/Customer';
import {
    customerListLoaded,
    customerListLoadingFailed,
} from '../actions';
import { loadCustomerList } from './load-customer-list';

describe('Saga: loadCustomerList', () => {
    let iterator: SagaIterator;

    beforeEach(() => {
        iterator = loadCustomerList();
    });

    describe('with a successful fetch', () => {
        it(`should dispatch an action with the customer list in it's payload`, () => {
            const expected = generateQuestionList();

            let next = iterator.next();
            next = iterator.next(expected);

            expect(next).toMatchObject({
                done: false,
                value: put(customerListLoaded(expected)),
            });
        });
    });

    describe('with a failed fetch', () => {
        it(`should disaptch an action with the error message in it's payload`, () => {
            const error = new Error('kaboom!');

            let next = iterator.next();
            next = iterator.throw(error);

            expect(next).toMatchObject({
                done: false,
                value: put(customerListLoadingFailed('kaboom!')),
            });
        });
    });
});

function generateQuestionList(options: Customer[] = []) {
    return [
        { id: 'iman' } as Customer,
        { id: 'cap' } as Customer,
        { id: 'hulk' } as Customer,
        ...options,
    ];
}

import { put } from 'redux-saga/effects';

import { SagaIterator } from '@redux-saga/core';

import {
    newFeedbackAddEnded,
    newFeedbackAddFailed,
    newFeedbackAddStarted,
} from '../actions';
import { addFeedback } from './add-feedback';

describe('Saga: addFeedback', () => {
    let iterator: SagaIterator;

    beforeEach(() => {
        iterator = addFeedback(newFeedbackAddStarted(`I've never seen such a boring film...`, 'cap'));
    });

    describe('with a successful server request', () => {
        it(`should dispatch an action with the new feedback object and the customer id in it's payload`, () => {

            let next = iterator.next();
            next = iterator.next({ id: 'too-booring', text: `I've never seen such a boring film...` });

            expect(next).toMatchObject({
                done: false,
                value: put(newFeedbackAddEnded({
                    id: 'too-booring',
                    text: `I've never seen such a boring film...`,
                }, 'cap')),
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
                value: put(newFeedbackAddFailed('kaboom!')),
            });
        });
    });
});

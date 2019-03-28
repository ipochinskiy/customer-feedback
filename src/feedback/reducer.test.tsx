import { StoreState } from './_domain/StoreState';
import {
    customerListLoaded,
    newCustomerAddEnded,
    newFeedbackAddEnded,
} from './actions';
import { reducer } from './reducer';

describe('Reducer: Feedback', () => {
    describe('when no state is given', () => {
        it('should return default state', () => {

            const result = reducer(undefined, { type: 'foo' });

            expect(result).toMatchObject({
                customerList: [],
            });
        });
    });

    describe('for CustomerListLoadedAction', () => {
        it('should set "customerList"', () => {

            const result = reducer(undefined, customerListLoaded([
                { id: 'iman', name: 'IronMan', photo: 'i/am/smart', feedbackList: [] },
            ]));

            expect(result).toMatchObject({
                customerList: [
                    { id: 'iman', name: 'IronMan', photo: 'i/am/smart', feedbackList: [] },
                ],
            });
        });
    });

    describe('for NewCustomerAddEndedAction', () => {
        it('should insert the new customer to the very fisrt position in the "customerList"', () => {
            const state: StoreState = createStoreState({
                customerList: [
                    { id: 'iman', name: 'IronMan', photo: 'i/am/smart', feedbackList: [] },
                ],
            });

            const result = reducer(state, newCustomerAddEnded({
                id: 'capM',
                name: 'Captain Marvel',
                photo: 'i/am/hot',
                feedbackList: [],
            }));

            expect(result).toMatchObject({
                customerList: [
                    { id: 'capM', name: 'Captain Marvel', photo: 'i/am/hot', feedbackList: [] },
                    { id: 'iman', name: 'IronMan', photo: 'i/am/smart', feedbackList: [] },
                ],
            });
        });
    });

    describe('for NewFeedbackAddEndedAction (single customer in the list, the ids are equal)', () => {
        it('should insert the new feedback to the very fisrt position in the "feedbackList" of the corresponding customer', () => {
            const state: StoreState = createStoreState({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                ],
            });

            const result = reducer(state, newFeedbackAddEnded({
                id: 'great-story',
                text: 'The story is fascinating and totally thought through',
            }, 'iman'));

            expect(result).toMatchObject({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'great-story',
                                text: 'The story is fascinating and totally thought through',
                            },
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                ],
            });
        });
    });

    describe('for NewFeedbackAddEndedAction (single customer in the list, the ids are equal, feedback list is empty)', () => {
        it('should insert the new feedback to the very fisrt position in the "feedbackList" of the corresponding customer', () => {
            const state: StoreState = createStoreState({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [],
                    },
                ],
            });

            const result = reducer(state, newFeedbackAddEnded({
                id: 'great-story',
                text: 'The story is fascinating and totally thought through',
            }, 'iman'));

            expect(result).toMatchObject({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'great-story',
                                text: 'The story is fascinating and totally thought through',
                            },
                        ],
                    },
                ],
            });
        });
    });

    describe('for NewFeedbackAddEndedAction (multiple customers in the list, the ids are equal)', () => {
        it('should not change another customer', () => {
            const state: StoreState = createStoreState({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                    {
                        id: 'cap',
                        name: 'Captain America',
                        photo: 'i/am/brave',
                        feedbackList: [],
                    },
                ],
            });

            const result = reducer(state, newFeedbackAddEnded({
                id: 'great-story',
                text: 'The story is fascinating and totally thought through',
            }, 'iman'));

            expect(result).toMatchObject({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'great-story',
                                text: 'The story is fascinating and totally thought through',
                            },
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                    {
                        id: 'cap',
                        name: 'Captain America',
                        photo: 'i/am/brave',
                        feedbackList: [],
                    },
                ],
            });
        });
    });

    describe('for NewFeedbackAddEndedAction (single customer in the list, the ids are different)', () => {
        it('should not change this customer', () => {
            const state: StoreState = createStoreState({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                ],
            });

            const result = reducer(state, newFeedbackAddEnded({
                id: 'great-story',
                text: 'The story is fascinating and totally thought through',
            }, 'cap'));

            expect(result).toMatchObject({
                customerList: [
                    {
                        id: 'iman',
                        name: 'Iron Man',
                        photo: 'i/am/smart',
                        feedbackList: [
                            {
                                id: 'too-long',
                                text: `That was too long I fell asleep`,
                            },
                        ],
                    },
                ],
            });
        });
    });
});

function createStoreState(options = {}): StoreState {
    return {
        customerList: [],
        ...options,
    };
}

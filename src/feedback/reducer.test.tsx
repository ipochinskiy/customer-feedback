import { StoreState } from './_domain/StoreState';
import {
    customerListLoaded,
    newCustomerAddEnded,
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
});

function createStoreState(options = {}): StoreState {
    return {
        customerList: [],
        ...options,
    };
}

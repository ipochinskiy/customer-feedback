import { customerListLoaded } from './actions';
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
        it('should return default state', () => {

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
});

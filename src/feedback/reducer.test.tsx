import { reducer } from './reducer';

describe('Reducer: Feedback', () => {
    describe('when no state is given', () => {
        it('should return default state', () => {

            const result = reducer(undefined, { type: 'foo' });

            expect(result).toMatchObject({
            });
        });
    });
});

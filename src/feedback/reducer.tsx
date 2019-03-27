import { StoreState } from './_domain/StoreState';
import { ActionTypes } from './actions';

const defaultState: StoreState = {
};

export function reducer(state: StoreState = defaultState, action: ActionTypes): StoreState {
    switch (action.type) {
        default:
            return state;
    }
}

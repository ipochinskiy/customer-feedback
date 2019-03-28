import { StoreState } from './_domain/StoreState';
import {
    Actions,
    ActionTypes,
    CustomerListLoadedAction,
} from './actions';

const defaultState: StoreState = {
    customerList: [],
};

export function reducer(state: StoreState = defaultState, action: ActionTypes): StoreState {
    switch (action.type) {
        case Actions.CUSTOMER_LIST_LOADED:
            const { customerList } = (action as CustomerListLoadedAction).payload;
            return {
                ...state,
                customerList,
            };
        default:
            return state;
    }
}

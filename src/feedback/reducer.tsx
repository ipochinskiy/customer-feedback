import { StoreState } from './_domain/StoreState';
import {
    Actions,
    ActionTypes,
    CustomerListLoadedAction,
    NewCustomerAddEndedAction,
} from './actions';

export const FEEDBACK_FEATURE = 'feedback';

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
        case Actions.NEW_CUSTOMER_ADD_ENDED:
            const { customer } = (action as NewCustomerAddEndedAction).payload;
            return {
                ...state,
                customerList: [
                    customer,
                    ...state.customerList,
                ],
            };
        default:
            return state;
    }
}

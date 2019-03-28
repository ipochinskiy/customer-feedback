import { StoreState } from './_domain/StoreState';
import {
    Actions,
    ActionTypes,
    CustomerListLoadedAction,
    NewCustomerAddEndedAction,
    NewFeedbackAddEndedAction,
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
        case Actions.NEW_FEEDBACK_ADD_ENDED:
            const { feedback, customerId } = (action as NewFeedbackAddEndedAction).payload;
            const customerIndex = state.customerList.findIndex(({ id }) => id === customerId);
            if (customerIndex === -1) {
                return state;
            }
            const customerWithFeedback = {
                ...state.customerList[customerIndex],
                feedbackList: [
                    feedback,
                    ...state.customerList[customerIndex].feedbackList,
                ],
            };
            return {
                ...state,
                customerList: [
                    ...state.customerList.slice(0, customerIndex),
                    customerWithFeedback,
                    ...state.customerList.slice(customerIndex + 1),
                ],
            };
        default:
            return state;
    }
}

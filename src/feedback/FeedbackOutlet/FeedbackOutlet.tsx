import './FeedbackOutlet.scss';

import React, {
    Component,
    Dispatch,
} from 'react';
import { connect } from 'react-redux';
import {
    RouteComponentProps,
    withRouter,
} from 'react-router-dom';

import { Customer } from '../_domain/Customer';
import {
    ActionTypes,
    feedbackLoaded,
    newCustomerAddStarted,
} from '../actions';
import CustomerList from '../CustomerList/CustomerList';
import FeedbackList from '../FeedbackList/FeedbackList';
import { FEEDBACK_FEATURE } from '../reducer';

interface PropsFromRouter {
    customerId: string;
}

interface PropsFromState {
    customerList: Customer[];
}

interface PropsFromDispatch {
    feedbackLoaded: () => void;
    newCustomerAddStarted: (newCustomerName: string) => void;
}

export type ComponentProps = RouteComponentProps<PropsFromRouter> & PropsFromState & PropsFromDispatch;

export class FeedbackOutlet extends Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props);

        this.addCustomer = this.addCustomer.bind(this);
    }

    componentDidMount() {
        const { feedbackLoaded } = this.props;
        feedbackLoaded();
    }

    addCustomer(newCustomerName: string) {
        const { newCustomerAddStarted } = this.props;
        newCustomerAddStarted(newCustomerName);
    }

    render() {
        const { match, customerList } = this.props;

        let rightColumn;
        if (match && match.params && match.params.customerId) {
            const {customerId} = match.params;
            const customer = customerList.find(({ id }) => id === customerId);
            const feedbackList = customer && customer.feedbackList || [];
            rightColumn = (
                <div className='FeedbackOutlet__column'>
                    <FeedbackList title='Feedback' feedbackList={feedbackList} />
                </div>
            );
        } else {
            rightColumn = <div className='FeedbackOutlet__empty'>Please select a customer</div>;
        }

        return (
            <div className='FeedbackOutlet'>
                <div className='FeedbackOutlet__column'>
                    <CustomerList title='Customers' customerList={customerList} addCustomer={this.addCustomer}/>
                </div>
                {rightColumn}
            </div>
        );
    }
}

const mapStateToProps = (state: any): PropsFromState => {
    return {
        customerList: state[FEEDBACK_FEATURE].customerList || [],
    };
};

const mapDisaptchToProps = (dispatch: Dispatch<ActionTypes>): PropsFromDispatch => {
    return {
        feedbackLoaded: () => dispatch(feedbackLoaded()),
        newCustomerAddStarted: (newCustomerName: string) => dispatch(newCustomerAddStarted(newCustomerName)),
    };
};

const connectedFeedbackOutlet = connect(
    mapStateToProps,
    mapDisaptchToProps,
)(FeedbackOutlet);

export default withRouter(connectedFeedbackOutlet);

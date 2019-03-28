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
}

export type ComponentProps = RouteComponentProps<PropsFromRouter> & PropsFromState & PropsFromDispatch;

export class FeedbackOutlet extends Component<ComponentProps> {
    componentDidMount() {
        const { feedbackLoaded } = this.props;
        feedbackLoaded();
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
                    <CustomerList title='Customers' customerList={customerList} />
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
    };
};

const connectedFeedbackOutlet = connect(
    mapStateToProps,
    mapDisaptchToProps,
)(FeedbackOutlet);

export default withRouter(connectedFeedbackOutlet);

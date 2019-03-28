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
import { Feedback } from '../_domain/Feedback';
import { StoreState } from '../_domain/StoreState';
import {
    ActionTypes,
    feedbackLoaded,
} from '../actions';
import CustomerList from '../CustomerList/CustomerList';
import FeedbackList from '../FeedbackList/FeedbackList';

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
        const customerList: Customer[] = [
            { id: 'iman', name: 'Iron Man', photo: 'http://lorempixel.com/50/50/cats/1' },
            { id: 'cap', name: 'Captain America', photo: 'http://lorempixel.com/50/50/cats/2' },
            { id: 'hulk', name: 'Hulk', photo: 'http://lorempixel.com/50/50/cats/3' },
        ];
        const feedbackList: Feedback[] = [
            { id: 'first-feedback', text: 'It would be great if we would see all statistics on one place' },
            { id: 'second-one', text: 'We want to be able to invite people from outside' },
            { id: 'yet-another-one', text: 'Color scheme needs some adjustments' },
        ];
        const { match } = this.props;

        let rightColumn;
        if (match && match.params && match.params.customerId) {
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

const mapStateToProps = (state: StoreState): PropsFromState => {
    return {
        customerList: [],
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

import './Feedback.scss';

import React, { Component } from 'react';
import {
    RouteComponentProps,
    withRouter,
} from 'react-router-dom';

import { Customer } from '../_domain/Customer';
import { Feedback as IFeedback } from '../_domain/Feedback';
import CustomerList from '../CustomerList/CustomerList';
import FeedbackList from '../FeedbackList/FeedbackList';

export interface PropTypes {
    customerId: string;
}

export class Feedback extends Component<RouteComponentProps<PropTypes>> {
    render() {
        const customerList: Customer[] = [
            { id: 'iman', name: 'Iron Man', photo: 'http://lorempixel.com/50/50/cats/1' },
            { id: 'cap', name: 'Captain America', photo: 'http://lorempixel.com/50/50/cats/2' },
            { id: 'hulk', name: 'Hulk', photo: 'http://lorempixel.com/50/50/cats/3' },
        ];
        const feedbackList: IFeedback[] = [
            { id: 'first-feedback', text: 'It would be great if we would see all statistics on one place' },
            { id: 'second-one', text: 'We want to be able to invite people from outside' },
            { id: 'yet-another-one', text: 'Color scheme needs some adjustments' },
        ];
        const { match } = this.props;

        let rightColumn;
        if (match && match.params && match.params.customerId) {
            rightColumn = (
                <div className='Feedback__column'>
                    <FeedbackList title='Feedback' feedbackList={feedbackList} />
                </div>
            );
        } else {
            rightColumn = <div className='Feedback__empty'>Please select a customer</div>;
        }

        return (
            <div className='Feedback'>
                <div className='Feedback__column'>
                    <CustomerList title='Customers' customerList={customerList} />
                </div>
                {rightColumn}
            </div>
        );
    }
}

export default withRouter(Feedback);

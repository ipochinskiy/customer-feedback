import './Feedback.scss';

import React, { Component } from 'react';
import {
    RouteComponentProps,
    withRouter,
} from 'react-router-dom';

import { ListItem } from '../_domain/ListItem';
import CustomerList from '../CustomerList/CustomerList';

export interface PropTypes {
    customerId: string;
}

export class Feedback extends Component<RouteComponentProps<PropTypes>> {
    render() {
        const customerList: ListItem[] = [
            { id: 'iman', value: 'Iron Man' },
            { id: 'cap', value: 'Captain America' },
            { id: 'hulk', value: 'Hulk' },
        ];
        const feedbackList: ListItem[] = [
            { id: 'first-feedback', value: 'It would be great if we would see all statistics on one place' },
            { id: 'second-one', value: 'We want to be able to invite people from outside' },
            { id: 'yet-another-one', value: 'Color scheme needs some adjustments' },
        ];
        const { match } = this.props;

        let rightColumn;
        if (match && match.params && match.params.customerId) {
            rightColumn = (
                <div className='Feedback__column'>
                    <CustomerList title='Feedback' list={feedbackList} />
                </div>
            );
        } else {
            rightColumn = <div className='Feedback__empty'>Please select a customer</div>;
        }

        return (
            <div className='Feedback'>
                <div className='Feedback__column'>
                    <CustomerList title='Customers' list={customerList} />
                </div>
                {rightColumn}
            </div>
        );
    }
}

export default withRouter(Feedback);

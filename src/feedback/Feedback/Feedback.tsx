import './Feedback.scss';

import React, { Component } from 'react';

import { ListItem } from '../_domain/ListItem';
import AbstractList from '../AbstractList/AbstractList';

class Feedback extends Component {
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
        return (
            <div className='Feedback'>
                <div className='Feedback__column'>
                    <AbstractList title='Customers' list={customerList}/>
                </div>
                <div className='Feedback__column'>
                    <AbstractList title='Feedback' list={feedbackList}/>
                </div>
            </div>
        );
    }
}

export default Feedback;

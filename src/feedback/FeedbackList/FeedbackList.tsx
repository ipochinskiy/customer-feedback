import './FeedbackList.scss';

import React, { Component } from 'react';

import { Customer } from '../_domain/Customer';

export interface PropTypes {
    title: string;
    feedbackList: Customer[];
}

class FeedbackList extends Component<PropTypes> {
    render() {
        const { title, feedbackList } = this.props;

        return (
            <div className='FeedbackList'>
                <div className='FeedbackList__header'>
                    <div className='FeedbackList__title'>{title}</div>
                </div>
                <div className='FeedbackList__content'>
                    {feedbackList.map((item: Customer) =>
                        <div key={item.id} className='FeedbackList__item'>
                            {item.name}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FeedbackList;

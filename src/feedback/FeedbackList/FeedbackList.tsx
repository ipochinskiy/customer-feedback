import './FeedbackList.scss';

import React, { Component } from 'react';

import { ListItem } from '../_domain/ListItem';

export interface PropTypes {
    title: string;
    feedbackList: ListItem[];
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
                    {feedbackList.map((item: ListItem) =>
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

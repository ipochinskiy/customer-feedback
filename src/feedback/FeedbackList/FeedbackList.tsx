import './FeedbackList.scss';

import React, { Component } from 'react';

import { Feedback } from '../_domain/Feedback';

export interface PropTypes {
    feedbackList: Feedback[];
}

class FeedbackList extends Component<PropTypes> {
    render() {
        const { feedbackList } = this.props;

        return (
            <div className='FeedbackList'>
                <div className='FeedbackList__header'>
                    <div className='FeedbackList__title'>Feedback</div>
                </div>
                <div className='FeedbackList__content'>
                    {feedbackList.map((item: Feedback) =>
                        <div key={item.id} className='FeedbackList__item'>
                            {item.text}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FeedbackList;

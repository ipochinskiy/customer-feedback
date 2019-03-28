import './FeedbackList.scss';

import React, { Component } from 'react';

import { Button } from '../../ui-components';
import { Feedback } from '../_domain/Feedback';

export interface PropTypes {
    feedbackList: Feedback[];
    addFeedback: (text: string) => void,
}

class FeedbackList extends Component<PropTypes> {
    state = {
        isFeedbackFormShown: false,
        newFeedbackText: '',
    };

    constructor(props: PropTypes) {
        super(props);

        this.toggleFeedbackFormVisibility = this.toggleFeedbackFormVisibility.bind(this);
        this.changeNewFeedbackText = this.changeNewFeedbackText.bind(this);
        this.addFeedback = this.addFeedback.bind(this);
    }

    toggleFeedbackFormVisibility() {
        this.setState({ isFeedbackFormShown: !this.state.isFeedbackFormShown });
    }

    changeNewFeedbackText(event: any) {
        if (!event || !event.target) {
            return;
        }

        this.setState({ newFeedbackText: event.target.value });
    }

    addFeedback(event: any) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const { newFeedbackText } = this.state;
        const { addFeedback } = this.props;

        if (!newFeedbackText) {
            return;
        }

        addFeedback(newFeedbackText);
        this.toggleFeedbackFormVisibility();
    }

    render() {
        const { feedbackList } = this.props;
        const { isFeedbackFormShown } = this.state;

        let feedbackForm;
        if (isFeedbackFormShown) {
            feedbackForm = <form onSubmit={this.addFeedback}>
                <input
                    className='FeedbackList__input'
                    maxLength={140}
                    onChange={this.changeNewFeedbackText}
                />
            </form>;
        }

        return (
            <div className='FeedbackList'>
                <div className='FeedbackList__header'>
                    <div className='FeedbackList__title'>Feedback</div>
                    <Button shape='neutral' onClick={this.toggleFeedbackFormVisibility}>Add feedback</Button>
                </div>
                <div className='FeedbackList__content'>
                    {feedbackForm}
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

import './FeedbackList.scss';

import React, { Component } from 'react';

import {
    faHandSpock,
    faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

        const feedbackForm = <form onSubmit={this.addFeedback}>
            <input
                className='FeedbackList__input'
                maxLength={140}
                placeholder='New feedback'
                autoFocus
                onChange={this.changeNewFeedbackText}
            />
        </form>;

        const emptyState = <div className='FeedbackList__empty'>
            <div className='FeedbackList__empty__icon'><FontAwesomeIcon icon={faHandSpock} /></div>
            <div className='FeedbackList__empty__text'>This customer has left no feedback yet</div>
        </div>;

        const content = <div className='FeedbackList__content'>
            {feedbackList.map((item: Feedback) =>
                <div key={item.id} className='FeedbackList__item'>
                    {item.text}
                </div>
            )}
        </div>;

        const addButton = <Button shape='neutral' onClick={this.toggleFeedbackFormVisibility}>
            Add feedback
        </Button>;

        const closeButton = <div className='FeedbackList__icon' onClick={this.toggleFeedbackFormVisibility}>
            <FontAwesomeIcon icon={faTimesCircle} />
        </div>;

        return (
            <div className='FeedbackList'>
                <div className='FeedbackList__header'>
                    <div className='FeedbackList__title'>Feedback</div>
                    {isFeedbackFormShown ? closeButton : addButton}
                </div>
                {isFeedbackFormShown ? feedbackForm : null}
                {feedbackList.length > 0 ? content : emptyState}
            </div>
        );
    }
}

export default FeedbackList;

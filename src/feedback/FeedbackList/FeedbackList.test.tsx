import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';

import FeedbackList, { PropTypes } from './FeedbackList';

describe('Component: FeedbackList', () => {
    let props: PropTypes;
    let component: ShallowWrapper;

    beforeEach(() => {
        props = createComponentProps();
        component = shallow(<FeedbackList {...props} />);
    });

    it('should render the title', () => {

        expect(component).toIncludeText('Feedback');
    });

    it('should render the values', () => {

        expect(component)
            .toIncludeText('I have a problem')
            .toIncludeText('A terrible one')
            .toIncludeText('Yet another huge and fat one');
    });
});

function createComponentProps(options = {}): PropTypes {
    return {
        title: 'Feedback',
        feedbackList: [
            { id: 'first one', text: 'I have a problem' },
            { id: 'second one', text: 'A terrible one' },
            { id: 'third one', text: 'Yet another huge and fat one' },
        ],
        ...options,
    };
}

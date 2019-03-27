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

        expect(component).toIncludeText('Avengers');
    });

    it('should render the values', () => {

        expect(component)
            .toIncludeText('Iron Man')
            .toIncludeText('Captain America')
            .toIncludeText('Hulk');
    });
});

function createComponentProps(options = {}): PropTypes {
    return {
        title: 'Avengers',
        feedbackList: [
            { id: 'iman', name: 'Iron Man', photo: null },
            { id: 'cap', name: 'Captain America', photo: null },
            { id: 'hulk', name: 'Hulk', photo: null },
        ],
        ...options,
    };
}

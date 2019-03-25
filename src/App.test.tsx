import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

describe('Component: App', () => {
    it('should render the title', () => {
        const component = shallow(<App />);

        expect(component).toIncludeText('Customer Feedback');
    });

    it('should render the content', () => {
        const component = shallow(<App />);

        expect(component).toIncludeText('Content');
    });
});

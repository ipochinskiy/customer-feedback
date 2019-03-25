import { shallow } from 'enzyme';
import React from 'react';

import Feedback from './Feedback';

describe('Component: Feedback', () => {
    it('should render customers column', () => {
        const component = shallow(<Feedback />);

        expect(component).toIncludeText('Customers');
    });

    it('should render feedback column', () => {
        const component = shallow(<Feedback />);

        expect(component).toIncludeText('Feedback');
    });
});

import { shallow } from 'enzyme';
import React from 'react';

import Feedback from './Feedback';

describe('Component: Feedback', () => {
    it('should render customer list', () => {
        const component = shallow(<Feedback />);

        expect(component.find('AbstractList').at(0).props()).toMatchObject({
            title: 'Customers',
            list: [
                { id: 'iman', value: 'Iron Man' },
                { id: 'cap', value: 'Captain America' },
                { id: 'hulk', value: 'Hulk' },
            ],
        });
    });

    it('should render customer list', () => {
        const component = shallow(<Feedback />);

        expect(component.find('AbstractList').at(1).props()).toMatchObject({
            title: 'Feedback',
            list: [
                { id: 'first-feedback', value: 'It would be great if we would see all statistics on one place' },
                { id: 'second-one', value: 'We want to be able to invite people from outside' },
                { id: 'yet-another-one', value: 'Color scheme needs some adjustments' },
            ],
        });
    });
});

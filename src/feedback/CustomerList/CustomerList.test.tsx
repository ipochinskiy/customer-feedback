import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';

import CustomerList, { PropTypes } from './CustomerList';

describe('Component: CustomerList', () => {
    let props: PropTypes;
    let component: ShallowWrapper;

    beforeEach(() => {
        props = createComponentProps();
        component = shallow(<CustomerList {...props} />);
    });

    it('should render the title', () => {

        expect(component).toIncludeText('Avengers');
    });

    it('should render the values', () => {

        expect(component.find('NavLink').at(0).props()).toMatchObject({
            to: '/customers/iman',
        });
        expect(component.find('NavLink').at(1).props()).toMatchObject({
            to: '/customers/cap',
        });
        expect(component.find('NavLink').at(2).props()).toMatchObject({
            to: '/customers/hulk',
        });
    });
});

function createComponentProps(options = {}): PropTypes {
    return {
        title: 'Avengers',
        customerList: [
            { id: 'iman', name: 'Iron Man', photo: 'photo/of/iman' },
            { id: 'cap', name: 'Captain America', photo: 'photo/of/cap' },
            { id: 'hulk', name: 'Hulk', photo: 'photo/of/hulk' },
        ],
        ...options,
    };
}

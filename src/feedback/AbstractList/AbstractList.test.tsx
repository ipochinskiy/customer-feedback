import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';

import AbstractList, { PropTypes } from './AbstractList';

describe('Component: AbstractList', () => {
    let props: PropTypes;
    let component: ShallowWrapper;

    beforeEach(() => {
        props = createComponentProps();
        component = shallow(<AbstractList {...props} />);
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
        list: [
            { id: 'iman', value: 'Iron Man' },
            { id: 'cap', value: 'Captain America' },
            { id: 'hulk', value: 'Hulk' },
        ],
        ...options,
    };
}

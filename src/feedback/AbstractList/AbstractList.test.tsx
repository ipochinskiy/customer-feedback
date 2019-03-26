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

        expect(component)
            .toIncludeText('Iron Man')
            .toIncludeText('Captain America')
            .toIncludeText('Hulk');
    });

    describe('after click on an item', () => {
        beforeEach(() => {
            component.find('.AbstractList__item').at(1).simulate('click');
        });

        it('should call "selectItem" with the id of the item', () => {

            expect(props.selectItem)
                .toHaveBeenCalledTimes(1)
                .toHaveBeenCalledWith('cap');
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
        selectItem: jest.fn(),
        ...options,
    };
}

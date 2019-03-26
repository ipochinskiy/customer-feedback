import { shallow } from 'enzyme';
import React from 'react';

import AbstractList, { PropTypes } from './AbstractList';

describe('Component: AbstractList', () => {
    let props: PropTypes;

    beforeEach(() => {
        props = createComponentProps();
    });

    it('should render the title', () => {
        const component = shallow(<AbstractList {...props} />);

        expect(component).toIncludeText('Avengers');
    });

    it('should render the values', () => {
        const component = shallow(<AbstractList {...props} />);

        expect(component)
            .toIncludeText('Iron Man')
            .toIncludeText('Captain America')
            .toIncludeText('Hulk');
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

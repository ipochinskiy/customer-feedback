import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import Feedback, { PropTypes } from './Feedback';

describe('Component: Feedback', () => {
    let props: RouteComponentProps<PropTypes>;

    describe('when "match.params.customerId" is set', () => {
        beforeEach(() => {
            props = createComponentProps();
        });

        it('should render customer list', () => {
            const component = shallow(<Feedback {...props} />);

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
            const component = shallow(<Feedback {...props} />);

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

    describe('when "match.params.customerId" is falsy', () => {
        let component: ShallowWrapper;

        beforeEach(() => {
            props = createComponentProps({
                match: {
                    path: '/bazzinga!',
                    params: {
                        customerId: undefined,
                    },
                },
            });
            component = shallow(<Feedback {...props} />);
        });

        it('should render an empty state', () => {

            expect(component).toIncludeText('Please select a customer');
        });

        it('should not render the feedback list', () => {

            expect(component.find('AbstractList'))
                .toHaveLength(1)
                .not.toHaveProp('title', 'Feedback');
        });

        describe('and when the customer list calls "selectItem" prop', () => {
            beforeEach(() => {
                component.find('AbstractList').at(0).prop('selectItem')('cap');
            });

            it(`should navigate to the customer's feedback`, () => {

                expect(props.history.push)
                    .toHaveBeenCalledTimes(1)
                    .toHaveBeenCalledWith('/bazzinga!/cap');
            });
        });
    });

    describe('when "match.params" is falsy', () => {
        beforeEach(() => {
            props = createComponentProps({
                match: {
                    params: undefined,
                },
            });
        });

        it('should render an empty state', () => {
            const component = shallow(<Feedback {...props} />);

            expect(component).toIncludeText('Please select a customer');
        });
    });

    describe('when "match" is falsy', () => {
        beforeEach(() => {
            props = createComponentProps({
                match: undefined,
            });
        });

        it('should render an empty state', () => {
            const component = shallow(<Feedback {...props} />);

            expect(component).toIncludeText('Please select a customer');
        });
    });
});

function createComponentProps(options = {}): RouteComponentProps<PropTypes> {
    return {
        history: {
            push: jest.fn(),
        } as any,
        location: {},
        match: {
            path: '/bazzinga!',
            params: {
                customerId: 'iman',
            },
        },
        ...options,
    } as RouteComponentProps<PropTypes>;
}

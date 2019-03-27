import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import {
    Feedback,
    PropTypes,
} from './Feedback';

describe('Component: Feedback', () => {
    let props: RouteComponentProps<PropTypes>;
    let component: ShallowWrapper;

    describe('when "match.params.customerId" is set', () => {
        beforeEach(() => {
            props = createComponentProps();
            component = shallow(<Feedback {...props} />);
        });

        it('should render customer list', () => {

            expect(component.find('CustomerList').props()).toMatchObject({
                title: 'Customers',
                customerList: expect.arrayContaining([
                    expect.objectContaining({ id: 'iman', name: 'Iron Man' }),
                    expect.objectContaining({ id: 'cap', name: 'Captain America' }),
                    expect.objectContaining({ id: 'hulk', name: 'Hulk' }),
                ]),
            });
        });

        it('should render customer list', () => {

            expect(component.find('FeedbackList').props()).toMatchObject({
                title: 'Feedback',
                feedbackList: expect.arrayContaining([
                    expect.objectContaining({ id: 'first-feedback', name: 'It would be great if we would see all statistics on one place' }),
                    expect.objectContaining({ id: 'second-one', name: 'We want to be able to invite people from outside' }),
                    expect.objectContaining({ id: 'yet-another-one', name: 'Color scheme needs some adjustments' }),
                ]),
            });
        });
    });

    describe('when "match.params.customerId" is falsy', () => {

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

            expect(component.find('CustomerList'))
                .toHaveLength(1)
                .toHaveProp('title', 'Customers');
        });
    });

    describe('when "match.params" is falsy', () => {
        beforeEach(() => {
            props = createComponentProps({
                match: {
                    params: undefined,
                },
            });
            component = shallow(<Feedback {...props} />);
        });

        it('should render an empty state', () => {

            expect(component).toIncludeText('Please select a customer');
        });
    });

    describe('when "match" is falsy', () => {
        beforeEach(() => {
            props = createComponentProps({
                match: undefined,
            });
            component = shallow(<Feedback {...props} />);
        });

        it('should render an empty state', () => {

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
            params: {
                customerId: 'iman',
            },
        },
        ...options,
    } as RouteComponentProps<PropTypes>;
}

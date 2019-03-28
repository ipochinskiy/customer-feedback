import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';

import {
    ComponentProps,
    FeedbackOutlet,
} from './FeedbackOutlet';

describe('Component: FeedbackOutlet', () => {
    let props: ComponentProps;
    let component: ShallowWrapper;

    it('should dispatch "feedbackLoaded"', () => {
        const props = createComponentProps();

        shallow(<FeedbackOutlet {...props} />);

        expect(props.feedbackLoaded)
            .toHaveBeenCalledTimes(1)
            .toHaveBeenCalledWith();
    });

    describe('when "match.params.customerId" is set', () => {
        beforeEach(() => {
            props = createComponentProps();
            component = shallow(<FeedbackOutlet {...props} />);
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
                    expect.objectContaining({ id: 'first-feedback', text: 'It would be great if we would see all statistics on one place' }),
                    expect.objectContaining({ id: 'second-one', text: 'We want to be able to invite people from outside' }),
                    expect.objectContaining({ id: 'yet-another-one', text: 'Color scheme needs some adjustments' }),
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
            component = shallow(<FeedbackOutlet {...props} />);
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
            component = shallow(<FeedbackOutlet {...props} />);
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
            component = shallow(<FeedbackOutlet {...props} />);
        });

        it('should render an empty state', () => {

            expect(component).toIncludeText('Please select a customer');
        });
    });

    describe('when CustomerList calls "addCustomer" prop', () => {
        beforeEach(() => {
            (component.find('CustomerList').prop('addCustomer') as Function)('Captain Marvel');
        });

        it('should call "newCustomerAddStarted" prop', () => {

            expect(props.newCustomerAddStarted)
                .toHaveBeenCalledTimes(1)
                .toHaveBeenCalledWith('Captain Marvel');
        });
    });
});

function createComponentProps(options = {}): ComponentProps {
    return {
        customerList: [
            {
                id: 'iman',
                name: 'Iron Man',
                photo: 'i/am/smart',
                feedbackList: [
                    { id: 'first-feedback', text: 'It would be great if we would see all statistics on one place' },
                    { id: 'second-one', text: 'We want to be able to invite people from outside' },
                    { id: 'yet-another-one', text: 'Color scheme needs some adjustments' },
                ],
            },
            {
                id: 'cap',
                name: 'Captain America',
                photo: 'i/am/brave',
                feedbackList: [],
            },
            {
                id: 'hulk',
                name: 'Hulk',
                photo: 'i/am/strong',
                feedbackList: [],
            },
        ],
        feedbackLoaded: jest.fn(),
        newCustomerAddStarted: jest.fn(),
        history: {
            push: jest.fn(),
        } as unknown as any,
        location: {} as unknown as any,
        match: {
            params: {
                customerId: 'iman',
            },
        } as unknown as any,
        ...options,
    } as ComponentProps;
}

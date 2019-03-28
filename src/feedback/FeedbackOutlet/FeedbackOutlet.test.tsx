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
});

function createComponentProps(options = {}): ComponentProps {
    return {
        feedbackLoaded: jest.fn(),
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
    } as unknown as ComponentProps;
}

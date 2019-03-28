import {
    shallow,
    ShallowWrapper,
} from 'enzyme';
import React from 'react';

import FeedbackList, { PropTypes } from './FeedbackList';

describe('Component: FeedbackList', () => {
    let props: PropTypes;
    let component: ShallowWrapper;

    beforeEach(() => {
        props = createComponentProps();
        component = shallow(<FeedbackList {...props} />);
    });

    it('should render the title', () => {

        expect(component).toIncludeText('Feedback');
    });

    it('should render the values', () => {

        expect(component)
            .toIncludeText('I have a problem')
            .toIncludeText('A terrible one')
            .toIncludeText('Yet another huge and fat one');
    });

    it('should render the button for adding new customers', () => {

        expect(component.find('Button').props()).toMatchObject({
            shape: 'neutral',
            children: 'Add feedback',
        });
    });

    describe('and after clicking on this button', () => {
        beforeEach(() => {
            component.find('Button').simulate('click');
        });

        it('should render an input field', () => {

            expect(component.find('input'))
                .toExist()
                .toHaveProp('maxLength', 140)
                .toHaveProp('placeholder', 'New feedback');
        });

        describe('and after clicking this button again', () => {
            beforeEach(() => {
                component.find('Button').simulate('click');
            });

            it('should not render the input field anymore', () => {

                expect(component.find('input')).not.toExist();
            });
        });

        describe('and after submitting an empty field (with falsy event)', () => {
            beforeEach(() => {
                component.find('form').simulate('submit');
            });

            it('should not call "addFeedback"', () => {

                expect(props.addFeedback).not.toHaveBeenCalled();
            });
        });

        describe('and after submitting an empty field (with an event without "preventDefault")', () => {
            let event: Event;

            beforeEach(() => {
                event = {} as unknown as Event;
                component.find('form').simulate('submit', event);
            });

            it('should not call "addFeedback"', () => {

                expect(props.addFeedback).not.toHaveBeenCalled();
            });
        });

        describe('and after submitting an empty field (with a normal event)', () => {
            let event: Event;

            beforeEach(() => {
                event = { preventDefault: jest.fn() } as unknown as Event;
                component.find('form').simulate('submit', event);
            });

            it('should prevent default event handling', () => {

                expect(event.preventDefault).toHaveBeenCalledTimes(1);
            });

            it('should not call "addFeedback"', () => {

                expect(props.addFeedback).not.toHaveBeenCalled();
            });
        });

        describe('after a string is typed into the field', () => {
            beforeEach(() => {
                component.find('input').simulate('change', { target: { value: 'Captain Marvel' } });
            });

            describe('and after submitting the field (with a normal event)', () => {
                let event: Event;

                beforeEach(() => {
                    event = { preventDefault: jest.fn() } as unknown as Event;
                    component.find('form').simulate('submit', event);
                });

                it('should call "addFeedback" with this value', () => {

                    expect(props.addFeedback)
                        .toHaveBeenCalledTimes(1)
                        .toHaveBeenCalledWith('Captain Marvel');
                });

                it('should not render the input field anymore', () => {

                    expect(component.find('input')).not.toExist();
                });
            });
        });
    });
});

function createComponentProps(options = {}): PropTypes {
    return {
        feedbackList: [
            { id: 'first one', text: 'I have a problem' },
            { id: 'second one', text: 'A terrible one' },
            { id: 'third one', text: 'Yet another huge and fat one' },
        ],
        addFeedback: jest.fn(),
        ...options,
    };
}

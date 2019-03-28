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

        expect(component).toIncludeText('Customers');
    });

    it('should not render an input field', () => {

        expect(component.find('input')).not.toExist();
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

    it('should render the button for adding new customers', () => {

        expect(component.find('Button').props()).toMatchObject({
            shape: 'primary',
            children: 'Add customer',
        });
    });

    describe('and after clicking on this button', () => {
        beforeEach(() => {
            component.find('Button').simulate('click');
        });

        it('should render an input field', () => {

            expect(component.find('input'))
                .toExist()
                .toHaveProp('maxLength', 40)
                .toHaveProp('autoFocus')
                .toHaveProp('placeholder', 'New customer');
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

            it('should not call "addCustomer"', () => {

                expect(props.addCustomer).not.toHaveBeenCalled();
            });
        });

        describe('and after submitting an empty field (with an event without "preventDefault")', () => {
            let event: Event;

            beforeEach(() => {
                event = {} as unknown as Event;
                component.find('form').simulate('submit', event);
            });

            it('should not call "addCustomer"', () => {

                expect(props.addCustomer).not.toHaveBeenCalled();
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

            it('should not call "addCustomer"', () => {

                expect(props.addCustomer).not.toHaveBeenCalled();
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

                it('should call "addCustomer" with this value', () => {

                    expect(props.addCustomer)
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
        customerList: [
            { id: 'iman', name: 'Iron Man', photo: 'photo/of/iman', feedbackList: [] },
            { id: 'cap', name: 'Captain America', photo: 'photo/of/cap', feedbackList: [] },
            { id: 'hulk', name: 'Hulk', photo: 'photo/of/hulk', feedbackList: [] },
        ],
        addCustomer: jest.fn(),
        ...options,
    };
}

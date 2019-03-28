import './CustomerList.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../../ui-components';
import { Customer } from '../_domain/Customer';

export interface PropTypes {
    customerList: Customer[];
    addCustomer: (newCustomerName: string) => void;
}

interface State {
    isCustomerFormShow: boolean;
    newCustomerName: string;
}

class CustomerList extends Component<PropTypes, State> {
    state = {
        isCustomerFormShow: false,
        newCustomerName: '',
    };

    constructor(props: PropTypes) {
        super(props);

        this.toggleCustomerFormVisibility = this.toggleCustomerFormVisibility.bind(this);
        this.changeNewCustomerName = this.changeNewCustomerName.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }

    toggleCustomerFormVisibility() {
        this.setState({ isCustomerFormShow: !this.state.isCustomerFormShow });
    }

    changeNewCustomerName(event: any) {
        if (!event || !event.target) {
            return;
        }

        this.setState({ newCustomerName: event.target.value });
    }

    addCustomer(event: any) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const { newCustomerName } = this.state;
        const { addCustomer } = this.props;

        if (!newCustomerName) {
            return;
        }

        addCustomer(newCustomerName);
        this.toggleCustomerFormVisibility();
    }

    render() {
        const { customerList } = this.props;
        const { isCustomerFormShow } = this.state;

        let customerForm;
        if (isCustomerFormShow) {
            customerForm = <form onSubmit={this.addCustomer}>
                <input
                    className='CustomerList__item'
                    maxLength={40}
                    placeholder='New customer'
                    onChange={this.changeNewCustomerName}
                />
            </form>;
        }

        return (
            <div className='CustomerList'>
                <div className='CustomerList__header'>
                    <div className='CustomerList__title'>Customers</div>
                    <Button shape='primary' onClick={this.toggleCustomerFormVisibility}>Add customer</Button>
                </div>
                <div className='CustomerList__content'>
                    {customerForm}
                    {customerList.map((customer: Customer, index: number) =>
                        <NavLink
                            key={customer.id}
                            to={`/customers/${customer.id}`}
                            className='CustomerList__link'
                            activeClassName='CustomerList__link--active'
                        >
                            <img src={`http://lorempixel.com/50/50/cats/${index + 1}`}/>
                            {customer.name}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }
}

export default CustomerList;

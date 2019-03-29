import './CustomerList.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import {
    faHandSpock,
    faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

        const customerForm = <form onSubmit={this.addCustomer}>
            <input
                className='CustomerList__input'
                maxLength={40}
                placeholder='New customer'
                autoFocus
                onChange={this.changeNewCustomerName}
            />
        </form>;

        const emptyState = <div className='CustomerList__empty'>
            <div className='CustomerList__empty__icon'><FontAwesomeIcon icon={faHandSpock} /></div>
            <div className='CustomerList__empty__text'>There are no customers yet</div>
        </div>;

        const content = <div className='CustomerList__content'>
            {customerList.map((customer: Customer, index: number) =>
                <NavLink
                    key={customer.id}
                    to={`/customers/${customer.id}`}
                    className='CustomerList__link'
                    activeClassName='CustomerList__link--active'
                >
                    <img src={`http://lorempixel.com/50/50/cats/${index + 1}`} />
                    {customer.name}
                </NavLink>
            )}
        </div>;

        const addButton = <Button shape='primary' onClick={this.toggleCustomerFormVisibility}>
            Add customer
        </Button>;

        const closeButton = <div className='CustomerList__icon' onClick={this.toggleCustomerFormVisibility}>
            <FontAwesomeIcon icon={faTimesCircle} />
        </div>;

        return (
            <div className='CustomerList'>
                <div className='CustomerList__header'>
                    <div className='CustomerList__title'>Customers</div>
                    {isCustomerFormShow ? closeButton : addButton}
                </div>
                {isCustomerFormShow ? customerForm : null}
                {customerList.length > 0 ? content : emptyState}
            </div>
        );
    }
}

export default CustomerList;

import './CustomerList.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Customer } from '../_domain/Customer';

export interface PropTypes {
    title: string;
    customerList: Customer[];
}

class CustomerList extends Component<PropTypes> {
    render() {
        const { title, customerList } = this.props;

        return (
            <div className='CustomerList'>
                <div className='CustomerList__header'>
                    <div className='CustomerList__title'>{title}</div>
                </div>
                <div className='CustomerList__content'>
                    {customerList.map((customer: any, index: number) =>
                        <NavLink
                            key={customer.id}
                            to={`/customers/${customer.id}`}
                            className='CustomerList__item'
                            activeClassName='CustomerList__item--active'
                        >
                            {customer.name}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }
}

export default CustomerList;

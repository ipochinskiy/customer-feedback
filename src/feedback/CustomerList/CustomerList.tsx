import './CustomerList.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem } from '../_domain/ListItem';

export interface PropTypes {
    title: string;
    list: ListItem[];
}

class CustomerList extends Component<PropTypes> {
    render() {
        const { title, list } = this.props;

        return (
            <div className='CustomerList'>
                <div className='CustomerList__header'>
                    <div className='CustomerList__title'>{title}</div>
                </div>
                <div className='CustomerList__content'>
                    {list.map((item: any) =>
                        <NavLink
                            key={item.id}
                            to={`/customers/${item.id}`}
                            className='CustomerList__item'
                            activeClassName='CustomerList__item--active'
                        >
                            {item.value}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }
}

export default CustomerList;

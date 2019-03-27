import './AbstractList.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem } from '../_domain/ListItem';

export interface PropTypes {
    title: string;
    list: ListItem[];
}

class AbstractList extends Component<PropTypes> {
    render() {
        const { title, list } = this.props;

        return (
            <div className='AbstractList'>
                <div className='AbstractList__header'>
                    <div className='AbstractList__title'>{title}</div>
                </div>
                <div className='AbstractList__content'>
                    {list.map((item: any) =>
                        <NavLink
                            key={item.id}
                            to={`/customers/${item.id}`}
                            className='AbstractList__item'
                            activeClassName='AbstractList__item--active'
                        >
                            {item.value}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }
}

export default AbstractList;

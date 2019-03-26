import './AbstractList.scss';

import React, { FunctionComponent } from 'react';

import { ListItem } from '../_domain/ListItem';

export interface PropTypes {
    title: string;
    list: ListItem[];
}

const AbstractList: FunctionComponent<PropTypes> = ({ title, list }) => {
    return (
        <div className='AbstractList'>
            <div className='AbstractList__header'>
                <div className='AbstractList__title'>{title}</div>
            </div>
            <div className='AbstractList__content'>
                {list.map((item: any) =>
                    <div key={item.id} className='AbstractList__item'>{item.value}</div>
                )}
            </div>
        </div>
    );
}

export default AbstractList;

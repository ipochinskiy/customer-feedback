import './Button.scss';

import React, { FunctionComponent } from 'react';

interface PropTypes {
    shape: string;
}

const Button: FunctionComponent<PropTypes> = ({ shape = 'primary', children }) => (
    <button className={`Button Button--${shape}`}>{children}</button>
);

export default Button;

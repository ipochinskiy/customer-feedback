import './Button.scss';

import React, { FunctionComponent } from 'react';

interface PropTypes {
    shape: string;
    onClick?: () => void;
}

const Button: FunctionComponent<PropTypes> = ({ shape = 'primary', children, ...rest }) => (
    <button className={`Button Button--${shape}`} {...rest}>{children}</button>
);

export default Button;

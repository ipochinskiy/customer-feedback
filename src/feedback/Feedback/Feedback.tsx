import './Feedback.scss';

import React, { Component } from 'react';

class Feedback extends Component {
    render() {
        return (
            <div className='Feedback'>
                <div className='Feedback__column'>
                    Customers
                </div>
                <div className='Feedback__column'>
                    Feedback
                </div>
            </div>
        );
    }
}

export default Feedback;

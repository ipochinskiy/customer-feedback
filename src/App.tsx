import './App.scss';

import React, { Component } from 'react';

import { Feedback } from './feedback';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App__header'>
                    Customer Feedback
                </header>
                <div className='App__content'>
                    <Feedback />
                </div>
            </div>
        );
    }
}

export default App;

import './App.scss';

import React, { Component } from 'react';

import { Feedback } from './feedback';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App__header'>
                    <div className='App__header__title'>Customer Feedback</div>
                </header>
                <div className='App__content'>
                    <Feedback />
                </div>
            </div>
        );
    }
}

export default App;

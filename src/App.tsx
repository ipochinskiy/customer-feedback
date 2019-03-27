import './App.scss';

import React, { Component } from 'react';
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { Feedback } from './feedback';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App__header'>
                    <div className='App__header__title'>Customer Feedback</div>
                </header>
                <div className='App__content'>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to='/customers'/>} />
                        <Route exact path="/customers" component={Feedback} />
                        <Route path="/customers/:customerId" component={Feedback} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

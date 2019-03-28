import './App.scss';

import React, { Component } from 'react';
import {
    NavLink,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { FeedbackOutlet } from './feedback';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App__header'>
                    <NavLink to='/' className='App__header__title'>Customer Feedback</NavLink>
                </header>
                <div className='App__content'>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to='/customers'/>} />
                        <Route exact path="/customers" component={FeedbackOutlet} />
                        <Route path="/customers/:customerId" component={FeedbackOutlet} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

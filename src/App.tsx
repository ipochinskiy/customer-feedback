import './App.scss';

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { Feedback } from './feedback';

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <header className='App__header'>
                        <div className='App__header__title'>Customer Feedback</div>
                    </header>
                    <div className='App__content'>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to='/customers'/>} />
                            <Route path="/customers" component={Feedback} />
                            <Route path="/customers/:customerId" component={Feedback} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

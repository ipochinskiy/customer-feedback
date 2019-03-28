import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import App from './App';
import { FEEDBACK_FEATURE } from './feedback';

describe('Component: App', () => {
    it('should render the title', () => {
        const dummyStore = createStore(state => ({
            [ FEEDBACK_FEATURE ]: {},
        }));

        const component = mount(
            <Provider store={dummyStore}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component).toIncludeText('Customer Feedback');
    });
});

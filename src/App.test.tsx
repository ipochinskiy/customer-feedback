import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('Component: App', () => {
    it('should render the title', () => {

        const component = mount(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(component).toIncludeText('Customer Feedback');
    });

    it('should redirect to the "/customers" route', () => {

        const component = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App />
            </MemoryRouter>
        );

        expect(component.find('Route'))
            .toHaveLength(1)
            .toHaveProp('path', '/customers');
    });
});

// Home.test.js
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from "../src/app/page";
import {debug} from "jest-preview";

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({"token": "QpwL5tke4Pnpja7X4"}),
    })
);

describe('Home component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Home component', () => {
        render(<Home/>);
        // Add more assertions based on your UI
        waitFor(() => {
            expect(screen.getByText('DNS Ninja')).toBeInTheDocument();
        });
    });

    test('handles lookup when button is clicked', async () => {
        render(<Home/>);

        const domainInput = screen.getByLabelText('Domain Name');
        const dnsTypeSelect = screen.getByLabelText('DNS Type');
        const lookupButton = screen.getByText('Lookup');

        fireEvent.change(domainInput, {target: {value: 'example.com'}});
        fireEvent.change(dnsTypeSelect, {target: {value: 'A'}});

        fireEvent.click(lookupButton);


        // Ensure fetch is called with the correct data
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"email": "eve.holt@reqres.in", "password": "cityslicka"}),
            });
            // expect(screen.getByText('DNS Ninja')).toBeInTheDocument();


            // expect(screen.getByText('Results of A records for')).toBeInTheDocument();

        });

    });

    // Add more tests as needed based on different scenarios and interactions
});

// NumberOfEvents.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

test('contains an input with the role of spinbutton', () => {
	render(<NumberOfEvents />);
	expect(screen.getByRole('spinbutton', { name: /Number of Events/i })).toBeInTheDocument();
});

test('has a default value of 32', () => {
	render(<NumberOfEvents />);
	expect(screen.getByRole('spinbutton', { name: /Number of Events/i })).toHaveValue(32);
});

test('allows user to change the value', async () => {
	render(<NumberOfEvents />);
	const input = screen.getByRole('spinbutton', { name: /Number of Events/i });
	await userEvent.clear(input);
	await userEvent.type(input, '10');
	expect(input).toHaveValue(10);
});
test('calls onChange with the correct value after typing', async () => {
	const handleChange = jest.fn();
	render(<NumberOfEvents onChange={handleChange} />);
	const input = screen.getByRole('spinbutton', { name: /Number of Events/i });

	// Clear the input and type '32', then check the most recent call to handleChange
	await userEvent.clear(input);
	await userEvent.type(input, '32');

	// Check the last call to ensure it was called with 32
	const lastCallArgument = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
	expect(lastCallArgument).toEqual(32);
});

test('does not crash without onChange prop', () => {
	render(<NumberOfEvents />);
	expect(() => {
		userEvent.type(screen.getByRole('spinbutton'), '0');
	}).not.toThrow();
});

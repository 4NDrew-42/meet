import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
	let setErrorAlert, onChange, rerender, input;

	beforeEach(() => {
		setErrorAlert = jest.fn();
		onChange = jest.fn();
		const utils = render(<NumberOfEvents setErrorAlert={setErrorAlert} onChange={onChange} />);
		input = screen.getByRole('spinbutton', { name: /Number of Events/i });
		rerender = utils.rerender;
	});

	test('initially has a default value of 32', () => {
		expect(input).toHaveValue(32);
	});

	test('allows user to change the value to a valid number', async () => {
		const user = userEvent.setup();
		await user.clear(input);
		await user.type(input, '10');
		await user.tab();
		expect(input).toHaveValue(10);
		expect(onChange).toHaveBeenCalledWith(10);
		expect(setErrorAlert).toHaveBeenCalledWith('');
	});

	test('rejects non-numeric input and resets to default', async () => {
		const user = userEvent.setup();
		await user.clear(input);
		await user.type(input, 'abc');
		await user.tab();
		expect(setErrorAlert).toHaveBeenCalledWith('Please enter a valid number of events (greater than 0).');
		expect(input).toHaveValue(32); // Check if reset to default
		expect(onChange).toHaveBeenCalledWith(32); // Ensure onChange was called with reset value
	});

	test('rejects negative numbers and resets to default', async () => {
		const user = userEvent.setup();
		await user.clear(input);
		await user.type(input, '-5');
		await user.tab();
		expect(setErrorAlert).toHaveBeenCalledWith('Please enter a valid number of events (greater than 0).');
		expect(input).toHaveValue(32); // Check if reset to default
		expect(onChange).toHaveBeenCalledWith(32); // Ensure onChange was called with reset value
	});

	test('does not crash without onChange prop', () => {
		rerender(<NumberOfEvents setErrorAlert={setErrorAlert} />);
		const user = userEvent.setup();
		expect(() => user.type(input, '20')).not.toThrow();
	});
});

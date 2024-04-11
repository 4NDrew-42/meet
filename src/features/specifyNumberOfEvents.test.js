import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
	test('User can specify the number of events they want to see', async ({ given, when, then }) => {
		given('the user has not specified a number of events', () => {
			render(<App />);
		});

		when('the user specifies a number of events to be shown', async () => {
			const user = userEvent.setup();
			await user.clear(screen.getByRole('spinbutton', { name: /number of events/i }));
			await user.type(screen.getByRole('spinbutton', { name: /number of events/i }), '10');
			await user.tab();
		});

		then('that number of events should be shown', async () => {
			await waitFor(() => {
				expect(screen.getAllByTestId('event').length).toBe(10);
			});
		});
	});

	test('Default number of events is shown', async ({ given, when, then }) => {
		given('the user has not specified a number of events', () => {
			render(<App />);
		});

		when('the user opens the app', () => {
			// No action needed as the app is already rendered
		});

		then('the default number of events is shown', async () => {
			await waitFor(() => {
				// Assuming your default number of events is 32
				expect(screen.getAllByTestId('event').length).toBe(32);
			});
		});
	});
});

import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	let AppComponent;

	beforeEach(() => {
		AppComponent = render(<App />);
	});

	test('An event element is collapsed by default', ({ given, when, then }) => {
		given('the main page is opened', () => {
			// AppComponent is already rendered in beforeEach
		});

		when('no action is taken', () => {
			// No action needed for this step
		});

		then('the event details are collapsed', () => {
			const details = screen.queryAllByTestId('event-details');
			expect(details.length).toBe(0);
		});
	});

	test('User can expand an event to see details', async ({ given, when, then }) => {
		given('the user has selected an event', () => {
			// Assuming an event is already rendered
		});

		when('the user clicks on the event details button', async () => {
			const user = userEvent.setup();
			// Assuming the button for the first event. Adjust selector as needed.
			const buttons = await screen.findAllByText('Show details');
			await user.click(buttons[0]);
		});

		then('the event details expand', () => {
			// Check for the presence of details after interaction
			const detailsVisible = screen.getByTestId('event-details'); // Assuming each event details have this testId
			expect(detailsVisible).toBeVisible();
		});
	});

	test('User can collapse an event to hide details', async ({ given, when, then }) => {
		given('the user has expanded an event to see its details', async () => {
			const user = userEvent.setup();
			// Assuming the button for the first event and it was already clicked to show details.
			const buttons = await screen.findAllByText('Show details');
			await user.click(buttons[0]); // Show details
		});

		when('the user clicks on the event details button again', async () => {
			const user = userEvent.setup();
			// Now, assuming the text changes to "Hide details". Adjust as per your implementation.
			const hideDetailsButton = await screen.findByText('Hide details');
			await user.click(hideDetailsButton);
		});

		then('the event details collapse', () => {
			const details = screen.queryByTestId('event-details');
			// This checks that the details are not present in the document.
			expect(details).not.toBeInTheDocument();
		});
	});
});

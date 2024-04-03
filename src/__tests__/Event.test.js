import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Event from '../components/Event';
import mockEvents from '../mock-data';

const formatTime = (dateTimeStr) => {
	const options = {
		weekday: 'short', // "Wed"
		month: 'long', // "April"
		day: 'numeric', // "17"
		hour: 'numeric', // "2"
		minute: '2-digit', // "00"
		hour12: true, // "PM" or "AM"
	};
	const date = new Date(dateTimeStr);
	return new Intl.DateTimeFormat('en-US', options).format(date);
};

describe('<Event /> component', () => {
	let EventComponent;
	const event = mockEvents[0]; // Correctly reference the first event from your mock data

	beforeEach(() => {
		const { container } = render(<Event event={event} />);
		EventComponent = container;
	});

	test('Event element is collapsed by default', () => {
		expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
	});

	test('renders event title', () => {
		expect(screen.getByText(event.summary)).toBeInTheDocument();
	});
	test('renders event location', () => {
		expect(screen.getByText(event.location)).toBeInTheDocument();
	});
	test('renders event start time in the correct format', () => {
		render(<Event event={mockEvents[0]} />);

		// Format the mock event's start.dateTime
		const formattedDateTime = formatTime(mockEvents[0].start.dateTime);

		// Use getAllByText to retrieve all instances and assert on the first one
		const dateTimeElements = screen.getAllByText(formattedDateTime);
		expect(dateTimeElements[0]).toBeInTheDocument();
	});

	test('renders event details button with the title "Show Details"', () => {
		expect(screen.getByText('Show details')).toBeInTheDocument();
	});
	test('clicking the "Show Details" button shows event details', async () => {
		fireEvent.click(screen.getByText('Show details'));
		expect(screen.getByTestId('event-details')).toBeInTheDocument();
	});

	test('shows event details upon clicking the "Show Details" button', () => {
		render(<Event event={mockEvents[0]} />);
		// Click the "Show Details" button to reveal the event details.
		fireEvent.click(screen.getAllByText('Show details')[0]);
		// Verify the details section is now visible.
		expect(screen.getByTestId('event-details')).toBeInTheDocument();
	});
	test('hides event details upon clicking the "Hide Details" button after they are shown', () => {
		render(<Event event={mockEvents[0]} />);
		// First, show the details.
		fireEvent.click(screen.getAllByText('Show details')[0]);
		// Then, hide the details.
		fireEvent.click(screen.getByText('Hide details'));
		// Verify the details section is not visible anymore.
		expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
	});
});

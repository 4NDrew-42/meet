import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
	beforeEach(() => {
		render(<EventList />); // Initial render without events
	});

	test('has an element with "list" role', () => {
		expect(screen.queryByRole('list')).toBeInTheDocument(); // Use screen here
	});

	test('renders correct number of events', async () => {
		const allEvents = await getEvents();
		render(<EventList events={allEvents} />); // Re-render with events
		expect(screen.getAllByRole('listitem')).toHaveLength(allEvents.length); // Use screen here
	});
});

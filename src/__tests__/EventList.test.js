import { render, screen, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

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

describe('<EventList /> integration', () => {
	test('renders a list of 32 events when the app is mounted and rendered', async () => {
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;
		const EventListDOM = AppDOM.querySelector('#event-list');
		await waitFor(() => {
			const EventListItems = within(EventListDOM).queryAllByRole('listitem');
			expect(EventListItems.length).toBe(32);
		});
	});
});

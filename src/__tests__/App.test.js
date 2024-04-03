import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
	let AppDOM;
	beforeEach(() => {
		AppDOM = render(<App />).container.firstChild;
	});
	test('renders list of events', () => {
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});
	test('render CitySearch', () => {
		expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
	});
	test('render NumberOfEvents', () => {
		expect(screen.getByRole('spinbutton', { name: /Number of Events/i })).toBeInTheDocument();
	});
});

describe('<App /> integration', () => {
	test('renders a list of events matching the city selected by the user', async () => {
		const user = userEvent.setup();
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		const CitySearchDOM = AppDOM.querySelector('#city-search');
		const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

		await user.type(CitySearchInput, 'Berlin');
		const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
		await user.click(berlinSuggestionItem);

		const EventListDOM = AppDOM.querySelector('#event-list');
		const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

		const allEvents = await getEvents();
		const berlinEvents = allEvents.filter((event) => event.location === 'Berlin, Germany');

		expect(allRenderedEventItems.length).toBe(berlinEvents.length);
	});

	test('renders a list of events matching the number of events selected by the user', async () => {
		const user = userEvent.setup();
		render(<App />);

		// Directly use screen to interact with your components
		const NumberOfEventsInput = screen.getByRole('spinbutton', { name: /Number of Events/i });
		await user.clear(NumberOfEventsInput);
		await user.type(NumberOfEventsInput, '1');

		// Assuming your event items have role 'listitem'
		const allRenderedEventItems = screen.queryAllByRole('listitem');

		// Expect only one event item to be rendered
		expect(allRenderedEventItems.length).toBe(1);
	});
});

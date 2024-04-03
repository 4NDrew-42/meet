import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');

	useEffect(() => {
		fetchData();
	}, [currentCity, currentNOE]);

	const fetchData = async () => {
		const allEvents = await getEvents();
		const filteredEvents = currentCity === 'See all cities' ? allEvents : allEvents.filter((event) => event.location === currentCity);
		setEvents(filteredEvents.slice(0, currentNOE));
		setAllLocations(extractLocations(allEvents));
	};

	return (
		<div className="App">
			<h1>Meet App</h1>
			<p>James Klein CF2024</p>
			<p>
				Choose your nearest city <br></br>to see what's happening!
			</p>
			<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
			<NumberOfEvents onChange={setCurrentNOE} />
			<EventList events={events} />
		</div>
	);
};

export default App;

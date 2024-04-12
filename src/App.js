import React, { useState, useEffect, useCallback } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [warningAlert, setWarningAlert] = useState('');

	const fetchData = useCallback(async () => {
		const allEvents = await getEvents();
		const filteredEvents = currentCity === 'See all cities' ? allEvents : allEvents.filter((event) => event.location === currentCity);
		setEvents(filteredEvents.slice(0, currentNOE));
		setAllLocations(extractLocations(allEvents));
	}, [currentCity, currentNOE]);

	useEffect(() => {
		if (!navigator.onLine) {
			setWarningAlert('You are offline. Events may be outdated.');
		} else {
			setWarningAlert('');
		}
		fetchData();
	}, [fetchData]);

	return (
		<div className="App">
			<h1>Meet App</h1>
			<p>James Klein CF2024</p>
			<div className="alerts-container">
				{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
				{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
				{warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
			</div>
			<p>
				Choose your nearest city <br></br>to see what's happening!
			</p>
			<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
			<NumberOfEvents onChange={setCurrentNOE} setErrorAlert={setErrorAlert} />
			<EventList events={events} />
		</div>
	);
};

export default App;

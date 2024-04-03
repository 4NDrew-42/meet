import React, { useState } from 'react';

const NumberOfEvents = ({ onChange }) => {
	const [numberOfEvents, setNumberOfEvents] = useState(32);

	const handleChange = (event) => {
		const value = parseInt(event.target.value, 10);
		setNumberOfEvents(value);
		if (onChange) {
			onChange(value);
		}
	};

	return <input type="number" className="number-of-events" value={numberOfEvents} onChange={handleChange} aria-label="Number of Events" />;
};

export default NumberOfEvents;

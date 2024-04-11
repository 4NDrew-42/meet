import React, { useState } from 'react';

const NumberOfEvents = ({ onChange, setErrorAlert }) => {
	const [numberOfEvents, setNumberOfEvents] = useState(32);

	const handleChange = (event) => {
		setNumberOfEvents(event.target.value); // Temporarily store any input
	};

	const handleBlur = () => {
		const number = parseInt(numberOfEvents, 10);
		if (isNaN(number) || number <= 0) {
			setErrorAlert('Please enter a valid number of events (greater than 0).');
			setNumberOfEvents(32); // Reset to default value
			onChange(32); // Communicate reset to parent component
		} else {
			setErrorAlert('');
			onChange(number); // Only call onChange with valid numbers
		}
	};

	return <input type="number" className="number-of-events" value={numberOfEvents} onChange={handleChange} onBlur={handleBlur} aria-label="Number of Events" />;
};

export default NumberOfEvents;

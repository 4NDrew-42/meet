import React, { useState } from 'react';

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

const Event = ({ event }) => {
	const [showDetails, setShowDetails] = useState(false);

	const handleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<div className="Event">
			<div className="Event__Overview">
				<h1 className="Event__Overview--Name">{event.summary}</h1>
				<p className="Event__Overview--Time">{formatTime(event.start.dateTime)}</p>
				<p className="Event__Overview--Location">{event.location}</p>
			</div>
			<button className="Event__Overview--Button" onClick={handleShowDetails}>
				{showDetails ? 'Hide details' : 'Show details'}
			</button>
			{showDetails && (
				<div className="Event__Details" data-testid="event-details">
					<h2>About event:</h2>
					<a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="Event__Details--Link">
						View Event Details
					</a>
					<p>{event.description}</p>
				</div>
			)}
		</div>
	);
};

export default Event;

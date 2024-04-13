import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Text } from 'recharts';

// Define genres outside the component to make it a static list that doesn't need to be a dependency of useCallback
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const EventGenresChart = ({ events }) => {
	const [data, setData] = useState([]);

	const getData = useCallback(() => {
		return genres
			.map((genre) => {
				const filteredEvents = events.filter((event) => event.summary.includes(genre));
				return { name: genre, value: filteredEvents.length };
			})
			.filter((genre) => genre.value > 0); // Filtering out genres with 0 events
	}, [events]); // Only events is a dependency now since genres is static

	useEffect(() => {
		setData(getData());
	}, [getData]); // Now depends on the memoized getData function

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

	const renderCustomizedLabel = ({ x, y, name, percent, index, cx }) => {
		return (
			<Text
				x={x}
				y={y}
				fill={COLORS[index % COLORS.length]} // Set text color based on slice color
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central"
				className="pieChartLabel"
			>
				{`${name} ${(percent * 100).toFixed(0)}%`}
			</Text>
		);
	};

	return (
		<ResponsiveContainer width="99%" height={400}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={100}
					fill="#8884d8"
					labelLine={false}
					label={renderCustomizedLabel} // Using the custom label component
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenresChart;

Testing in the Development Process

Project Description

Meet_App allows users to search for a city and get a list of events hosted in that city. It creates graphical location data (via a scatterplot) allowing users to visualize how many events will take place in each location. The App also visualizes the popularity of event genres (via a pie chart). visually appealing simple graphics allow users to more easily draw conclusions about events hosted in their city of choice no matter where they are.

Meet_App is a serverless, progressive web application (PWA) built with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

Objective: Learning the Testing in the Development Process

USER_STORIES: by feature

1. As a User, I should be able to filter events by city, so that I can discover relevant events wherever I am.

2. As a User, I should be able to show and hide event details, so that I can more easily navagate multiple events quickly.

3. As a User, I should be able to specify the number of events to display, so that I can more easily navagate multiple events quickly.

4. As a User, I should be able to use the app when offline, so that the events are searchable even when out of cellular of wifi range.

5. As a User, I should be able to add an app shortcut to the home screen, so that I can locate and launch the app quckly and easily.

6. As a User, I should be able to display charts visualizing event details, so that I can quickly access data visually and compare event to event enabling enhanced user choice.

USER_SCENARIOS: by feature

1. Filter events by city.
   User wants to view events in a specific city.
   Given the user has not selected a city yet;
   When the user selects a city from the dropdown menu or types the city name into the city filter box;
   Then the app should display only the events happening in the selected city.

2. User can show or hide details of an event.
   User is interested in more details about an event.
   Given the user is viewing the list of upcoming events in their selected city;
   When the user clicks on an event to see more details;
   Then the event's details should expand to show more information, and there should be an option to collapse the details back.

3. User can specify the number of events to view.
   User wants to limit the number of events displayed.
   Given the user is on the main page and the list of upcoming events is displayed;
   When the user specifies a number of events to view (e.g., 5);
   Then only the specified number of events should be displayed on the page.

4. Use the app when offline.
   User attempts to use the app without an internet connection.
   Given the user has previously opened the app while online;
   When the user opens the app without an internet connection;
   Then the app should display the last updated list of events and inform the user that they are offline but viewing cached content.

5. Add an app shortcut to the home screen.
   User wishes to access the app quickly from their mobile device.
   Given the user is using the app on a mobile device;
   When the user chooses to add the app shortcut to their home screen;
   Then the app shortcut should appear on the home screen and should open the app when tapped.

6. Display charts visualizing event details.
   User wants to see a visual representation of event details.
   Given the user is viewing the list of upcoming events in a selected city;
   When the user selects an option to view event details in chart form;
   Then the app should display a chart visualizing details of the events (e.g., number of events per day or genre distribution) in the selected city.

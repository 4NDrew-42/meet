Feature: Specify Number of Events

  Scenario: User can specify the number of events they want to see
    Given the user has not specified a number of events
    When the user specifies a number of events to be shown
    Then that number of events should be shown

  Scenario: Default number of events is shown
    Given the user has not specified a number of events
    When the user opens the app
    Then the default number of events is shown
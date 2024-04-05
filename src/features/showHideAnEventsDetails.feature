Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the main page is opened
    When no action is taken
    Then the event details are collapsed

  Scenario: User can expand an event to see details
    Given the user has selected an event
    When the user clicks on the event details button
    Then the event details expand

  Scenario: User can collapse an event to hide details
    Given the user has expanded an event to see its details
    When the user clicks on the event details button again
    Then the event details collapse

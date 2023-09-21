Feature: Test saucedemo website error message when login without fields filling

Scenario: As a user, I try to login without filling in the fields

Given I am on the login page
When I click on 'Login' button
Then I should see 'Epic sadface: Username is required' error message
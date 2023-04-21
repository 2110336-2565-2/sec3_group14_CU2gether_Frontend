*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers

Resource    ./keywords.robot

*** Test Cases ***
Test Robot
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Password
    Input And Verify Confirm Password
    Input And Verify StudentId
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button

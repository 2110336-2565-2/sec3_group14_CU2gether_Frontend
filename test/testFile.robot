*** Settings ***
Library             SeleniumLibrary
Resource            ./keywords.robot

Test Teardown       Close All Browsers


*** Test Cases ***
Test Register
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
    Verify Signup Success

Test Register With Duplicate Email
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Password
    Input And Verify Confirm Password
    Input And Verify Another StudentId
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Signup Failed

Test Register With Duplicate StudentId
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Another Email
    Input And Verify Password
    Input And Verify Confirm Password
    Input And Verify StudentId
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Signup Failed

Test Register With Empty Input
    Open application
    Click Signin Button
    Click Student Button
    Click Signup Button
    Verify Email Empty
    Verify Password Empty
    Verify Confirm Password Empty
    Verify Studentid Empty
    Verify Firstname Empty
    Verify Lastname Empty

Test Confirm Password Not Match
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Password
    Input And Verify Invalid Confirm Password
    Input And Verify Another StudentId
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Confirm Password Not Match

Test Invalid Password
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Invalid Password
    Input And Verify Invalid Confirm Password
    Input And Verify StudentId
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Password Invalid

Test Invalid Studentid Long
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Password
    Input And Verify Confirm Password
    Input And Verify Invalid StudentId Long
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Studentid Invalid

Test Invalid Studentid Short
    Open application
    Click Signin Button
    Click Student Button
    Input And Verify Email
    Input And Verify Password
    Input And Verify Confirm Password
    Input And Verify Invalid StudentId Short
    Input And Verify Firstname
    Input And Verify Lastname
    Click Signup Button
    Verify Studentid Invalid

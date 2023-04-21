*** Setting ***
Resource    ./environment.robot
Resource    ./commonKeywords.robot
Resource    ./testData.robot
Library    SeleniumLibrary

*** Keywords ***
Open application
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    1

Click Signin Button
    Click Button  //*[@id='joinus-button']
    Sleep    1

Click Student Button
    Click Button  //*[@id='cu-student']
    Sleep    1

Input And Verify Email
    Input text    //*[@id='sr-email']    ${test_email}
    ${email}    Get Value    //*[@id='sr-email']
    Should Be Equal    ${test_email}    ${email}

Input And Verify Password
    Input Text    //*[@id='sr-password']    ${test_password}
    ${password}    Get Value    //*[@id='sr-password']
    Should Be Equal    ${test_password}    ${password}

Input And Verify Confirm Password
    Input Text    //*[@id='sr-confirm-password']    ${test_password}
    ${password}    Get Value    //*[@id='sr-confirm-password']
    Should Be Equal    ${test_password}    ${password}

Input And Verify StudentId
    Input Text    //*[@id='sr-studentid']    ${test_studentid}
    ${studentid}    Get Value    //*[@id='sr-studentid']
    Should Be Equal    ${test_studentid}    ${studentid}

Input And Verify Firstname
    Input Text    //*[@id='sr-firstname']    ${test_firstname}
    ${firstname}    Get Value    //*[@id='sr-firstname']
    Should Be Equal    ${test_firstname}    ${firstname}

Input And Verify Lastname
    Input Text    //*[@id='sr-lastname']    ${test_lastname}
    ${lastname}    Get Value    //*[@id='sr-lastname']
    Should Be Equal    ${test_lastname}    ${lastname}

Click Signup Button
    Click Button    //*[@id='sr-submit-button']
    Sleep    1
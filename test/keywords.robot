*** Settings ***
Resource    ./environment.robot
Resource    ./commonKeywords.robot
Resource    ./testData.robot
Library     SeleniumLibrary


*** Keywords ***
Open application
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    1

Click Signin Button
    Click Button    //*[@id='joinus-button']
    Sleep    1

Click Student Button
    Click Button    //*[@id='cu-student']
    Sleep    1

Input And Verify Email
    Input text    //*[@id='sr-email']    ${test_email}
    ${email}    Get Value    //*[@id='sr-email']
    Should Be Equal    ${test_email}    ${email}

Input And Verify Another Email
    Input text    //*[@id='sr-email']    ${test_email2}
    ${email}    Get Value    //*[@id='sr-email']
    Should Be Equal    ${test_email2}    ${email}

Input And Verify Password
    Input Text    //*[@id='sr-password']    ${test_password}
    ${password}    Get Value    //*[@id='sr-password']
    Should Be Equal    ${test_password}    ${password}

Input And Verify Invalid Password
    Input Text    //*[@id='sr-password']    ${test_password_error}
    ${password}    Get Value    //*[@id='sr-password']
    Should Be Equal    ${test_password_error}    ${password}

Input And Verify Confirm Password
    Input Text    //*[@id='sr-confirm-password']    ${test_password}
    ${password}    Get Value    //*[@id='sr-confirm-password']
    Should Be Equal    ${test_password}    ${password}

Input And Verify Invalid Confirm Password
    Input Text    //*[@id='sr-confirm-password']    ${test_password_error}
    ${password}    Get Value    //*[@id='sr-confirm-password']
    Should Be Equal    ${test_password_error}    ${password}

Input And Verify Not Match Confirm Password
    Input Text    //*[@id='sr-confirm-password']    ${test_password2}
    ${password}    Get Value    //*[@id='sr-password']
    Should Be Equal    ${test_password2}    ${password}

Input And Verify StudentId
    Input Text    //*[@id='sr-studentid']    ${test_studentid}
    ${studentid}    Get Value    //*[@id='sr-studentid']
    Should Be Equal    ${test_studentid}    ${studentid}

Input And Verify Another StudentId
    Input Text    //*[@id='sr-studentid']    ${test_studentid2}
    ${studentid}    Get Value    //*[@id='sr-studentid']
    Should Be Equal    ${test_studentid2}    ${studentid}

Input And Verify Invalid StudentId Long
    Input Text    //*[@id='sr-studentid']    ${test_studentid_invalid_long}
    ${studentid}    Get Value    //*[@id='sr-studentid']
    Should Be Equal    ${test_studentid_invalid_long}    ${studentid}

Input And Verify Invalid StudentId Short
    Input Text    //*[@id='sr-studentid']    ${test_studentid_invalid_short}
    ${studentid}    Get Value    //*[@id='sr-studentid']
    Should Be Equal    ${test_studentid_invalid_short}    ${studentid}

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

Verify Signup Success
    Wait Until Element Is Visible    //*[@id='login-button']

Verify Signup Failed
    Wait Until Element Is Visible    //*[@id='try-again-button']

Verify Email Empty
    Wait Until Element Contains
    ...    //*[@id='basic_email_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_email_empty_message}

Verify Password Empty
    Wait Until Element Contains
    ...    //*[@id='basic_password_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_password_empty_message}

Verify Password Invalid
    Wait Until Element Contains
    ...    //*[@id='basic_password_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_password_invalid_message}

Verify Confirm Password Empty
    Wait Until Element Contains
    ...    //*[@id='basic_confirm_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_confirm_password_empty_message}

Verify Confirm Password Not Match
    Wait Until Element Contains
    ...    //*[@id='basic_confirm_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_confirm_password_invalid_message}

Verify Studentid Empty
    Wait Until Element Contains
    ...    //*[@id='basic_studentId_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_studentid_empty_message}

Verify Studentid Invalid
    Wait Until Element Contains
    ...    //*[@id='basic_studentId_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_studentid_invalid_message}

Verify Firstname Empty
    Wait Until Element Contains
    ...    //*[@id='basic_firstName_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_firstname_empty_message}

Verify Lastname Empty
    Wait Until Element Contains
    ...    //*[@id='basic_lastName_help']//*[@class='ant-form-item-explain-error']
    ...    ${test_lastname_empty_message}

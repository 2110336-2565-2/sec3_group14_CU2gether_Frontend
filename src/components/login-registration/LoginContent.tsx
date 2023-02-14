import React, { useState } from "react";

import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { MODE } from "./LoginAndRegistrationModal";

const FormWrapper = styled.div`
    padding-left: 10%;
    padding-right: 10%;
`;

const LoginTitle = styled.h1`
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    color: black;
`;

const SignUpText = styled.p`
    font-size: 24px;
    text-align: center;
    color: #bababa;
`;

const SignUpLink = styled(SignUpText)`
    color: #f96491;
    text-decoration: underline;

    &:hover {
        font-weight: 600;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const LoginContent: React.FC<{
    setLogin(isLogin: boolean): void;
    onSelectMode(mode: string): void;
}> = ({ setLogin, onSelectMode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const emailChangeHandler = (email: React.ChangeEvent<HTMLInputElement>) => {
        setIsEmailError(false);
        setEmail(email.target.value);
    };

    const passwordChangeHandler = (
        password: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsPasswordError(false);
        setPassword(password.target.value);
    };

    const signupHandler = () => {
        console.log("signup");
        setLogin(false);
        onSelectMode(MODE.SELECTROLE);
    };

    const forgotPasswordHandler = () => {
        console.log("forgot password");
    };

    return (
        <div>
            <LoginTitle>
                Log in to
                <span style={{ color: "#F96491" }}> CU</span>
                2Gether
            </LoginTitle>
            <FormWrapper>
                <Form
                    onFinish={() => console.log("log in success")}
                    onFinishFailed={() => console.log("log in failed")}
                >
                    <Form.Item
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: `Please enter your Email`,
                            },
                        ]}
                    >
                        <Input
                            placeholder="email"
                            onChange={emailChangeHandler}
                        />
                    </Form.Item>

                    <Form.Item
                        name="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Password",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="password"
                            onChange={passwordChangeHandler}
                        />
                    </Form.Item>
                </Form>
            </FormWrapper>

            <SignUpLink onClick={forgotPasswordHandler}>
                Forgot Password?
            </SignUpLink>

            <ButtonWrapper>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </ButtonWrapper>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <SignUpText>Have no account?</SignUpText>
                <SignUpLink onClick={signupHandler}>Sign up</SignUpLink>
            </div>
        </div>
    );
};

export default LoginContent;

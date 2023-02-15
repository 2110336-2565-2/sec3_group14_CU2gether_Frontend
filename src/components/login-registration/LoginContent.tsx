import React, { useState } from "react";

import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { MODE } from "./LoginAndRegistrationModal";
import axios from "axios";

const FormWrapper = styled.div`
    padding-left: 10%;
    padding-right: 10%;
`;

const SignUpText = styled.p`
    font-size: 24px;
    text-align: center;
    color: #bababa;
`;

const SignUpLink = styled(SignUpText)`
    color: #f96491;
    text-decoration: underline;
    margin-left: 10px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const LoginContent: React.FC<{
    setLogin(isLogin: boolean): void;
    onSelectMode(mode: string): void;
    toggleRegistrationModal(): void;
}> = ({ setLogin, onSelectMode, toggleRegistrationModal }) => {
    const signupHandler = () => {
        console.log("signup");
        setLogin(false);
        onSelectMode(MODE.SELECTROLE);
    };

    const forgotPasswordHandler = () => {
        console.log("forgot password");
    };

    const loginHandler = async (values: any) => {
        console.log(values);
        const email = values.Email;
        const password = values.Password;
        const isStudent = true;

        try {
            const response = await axios.post(
                "http://localhost:3001/login/login",
                {
                    email,
                    password,
                    isStudent,
                }
            );
            toggleRegistrationModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <FormWrapper>
                <Form
                    onFinish={loginHandler}
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
                        <Input placeholder="email" />
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
                        <Input.Password placeholder="password" />
                    </Form.Item>

                    <Form.Item>
                        <ButtonWrapper>
                            <Button type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </ButtonWrapper>
                    </Form.Item>
                </Form>
            </FormWrapper>

            <SignUpLink onClick={forgotPasswordHandler}>
                Forgot Password?
            </SignUpLink>

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

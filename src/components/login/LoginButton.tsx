import React, { useState } from "react";

import { Input, Button, Modal, Form } from "antd";

import styled from "styled-components";

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
    font-style: italic;

    &:hover {
        font-weight: 600;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Login: React.FC<{}> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setIsShow] = useState(false);
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

    const loginHandler = () => {
        if (!email) {
            setIsEmailError(true);
        }
        if (!password) {
            setIsPasswordError(true);
        }
        if (email && password) {
            setIsShow(false);
        }
    };

    const signupHandler = () => {
        console.log("eiei");
    };

    return (
        <div>
            <Button onClick={() => setIsShow(true)}>Log in</Button>
            <Modal
                open={isShow}
                // onOk={loginHandler}
                // okText="Log in"
                // okButtonProps={{
                //     style: {
                //         backgroundColor: "#E16D62",
                //         fontWeight: 800,
                //         borderRadius: 600,
                //     },
                // }}
                // onCancel={() => setIsShow(false)}
                centered={true}
                footer={null}
                bodyStyle={{ height: 750 }}
                width={600}
            >
                <LoginTitle>
                    Log in to
                    <span style={{ color: "#F96491" }}> CU</span>
                    2Gether
                </LoginTitle>
                <Form
                    onFinish={() => console.log("eiei")}
                    onFinishFailed={() => console.log("failed")}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Email!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="email"
                            onChange={emailChangeHandler}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="password"
                            onChange={passwordChangeHandler}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <SignUpText>Have no account?</SignUpText>
                            <SignUpLink onClick={signupHandler}>
                                Sign up
                            </SignUpLink>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <ButtonWrapper>
                            <Button htmlType="submit">Log in</Button>
                        </ButtonWrapper>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;

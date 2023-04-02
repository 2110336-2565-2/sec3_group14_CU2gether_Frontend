import React, { useState } from "react";

import styled from "styled-components";
import { Form, Input, Button, notification } from "antd";
import { MODE } from "./LoginAndRegistrationModal";
import { auth } from "api";
import theme from "@/utils/theme";

const LoginContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  padding-left: 10%;
  padding-right: 10%;
`;

const SignUpFooterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpText = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${theme.color_level.gray.light};
`;

const SignUpLink = styled(SignUpText)`
  color: ${theme.color.cu_pink};
  text-decoration: underline;
  margin-left: 10px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

type LoginContentProps = {
  setLoggingIn(isLogin: boolean): void;
  setLoggedIn(isLoggedIn: boolean): void;
  onSelectMode(mode: string): void;
  onLogin(): void;
  closeLoginModal(): void;
};

const LoginContent: React.FC<LoginContentProps> = ({
  setLoggingIn,
  setLoggedIn,
  onSelectMode,
  onLogin,
  closeLoginModal,
}) => {
  const signupHandler = () => {
    console.log("signup");
    setLoggingIn(false);
    onSelectMode(MODE.SELECTROLE);
  };

  const forgotPasswordHandler = () => {
    console.log("forgot password");
  };

  const loginHandler = async (values: any) => {
    const { email, password } = values;
    const res = await auth.login(email, password);
    if (res) {
      setLoggedIn(true);
      onLogin();
      closeLoginModal();
    } else {
      notification.open({
        message: "Login unsuccessfully",
        description: "Email or password is incorrect",
      });
    }
  };

  return (
    <LoginContentContainer>
      <FormContainer>
        <Form
          onFinish={loginHandler}
          onFinishFailed={() => console.log("log in failed")}
        >
          <Form.Item
            name="email"
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
            name="password"
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
            <ButtonContainer>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </ButtonContainer>
          </Form.Item>
        </Form>
      </FormContainer>
      <SignUpLink onClick={forgotPasswordHandler}>Forgot Password?</SignUpLink>
      <SignUpFooterContainer>
        <SignUpText>Have no account?</SignUpText>
        <SignUpLink onClick={signupHandler}>Sign up</SignUpLink>
      </SignUpFooterContainer>
    </LoginContentContainer>
  );
};

export default LoginContent;

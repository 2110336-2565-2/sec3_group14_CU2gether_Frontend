import React, { useState } from "react";

import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { MODE } from "./LoginAndRegistrationModal";
import { login } from "api";
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
  font-size: 24px;
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
  setLogin(isLogin: boolean): void;
  onSelectMode(mode: string): void;
  toggleRegistrationModal(): void;
};

const LoginContent: React.FC<LoginContentProps> = ({
  setLogin,
  onSelectMode,
  toggleRegistrationModal,
}) => {
  const signupHandler = () => {
    console.log("signup");
    setLogin(false);
    onSelectMode(MODE.SELECTROLE);
  };

  const forgotPasswordHandler = () => {
    console.log("forgot password");
  };

  const loginHandler = async (values: any) => {
    const { email, password } = values;
    login(email, password);
    toggleRegistrationModal();
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

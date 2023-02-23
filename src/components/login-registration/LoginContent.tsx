import axios from "axios";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import React, { useState } from "react";
import { MODE } from "./LoginAndRegistrationModal";
import theme from "@/utils/theme";

const FormContainer = styled.div`
  padding-left: 10%;
  padding-right: 10%;
`;

const SignUpText = styled.p`
  font-size: 24px;
  text-align: center;
  color: ${theme.color.gray};
`;

const SignUpLink = styled(SignUpText)`
  color: ${theme.color.pink};
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

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  setLogin(isLogin: boolean): void;
  onSelectMode(mode: string): void;
};

const LoginContent: React.FC<Props> = ({ setLogin, onSelectMode }) => {
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

  const loginHandler = async (values: any) => {
    console.log(values);
    // const email = values.Email;
    // const password = values.password;
    // const isStudent = true;

    // try {
    //     const response = await axios.post(
    //         "http://localhost:3001/auth/login",
    //         {
    //             email,
    //             password,
    //             isStudent,
    //         }
    //     );
    // } catch (error) {
    //     console.log(error);
    // }
  };

  return (
    <div>
      <FormContainer>
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
            <Input placeholder="email" onChange={emailChangeHandler} />
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

      <SignupContainer>
        <SignUpText>Have no account?</SignUpText>
        <SignUpLink onClick={signupHandler}>Sign up</SignUpLink>
      </SignupContainer>
    </div>
  );
};

export default LoginContent;

import React from "react";

import axios from "axios";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { ROLE } from "@/types";
import theme from "@/utils/theme";
import { registration } from "api";
import { MODE } from "./LoginAndRegistrationModal";
import { ContainedButton, OutlinedButton } from "@/common/button";
import {
  registerStudentParams,
  registerOrganizerParams,
} from "api/registration";

const { TextArea } = Input;

const RegistrationTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;

  ${theme.media.mobile} {
    padding-left: 0%;
    padding-right: 0%;
  }
`;

const DonePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding-right: 12%;
  padding-left: 12%;
  padding-top: 15%;
`;

const OperationButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SelectRoleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10%;
  padding-left: 10%;

  ${theme.media.mobile} {
    padding-right: 0%;
    padding-left: 0%;
  }
`;

const SelectRoleButtonText = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const SubtitleText1 = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;

  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const SubtitleText2 = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${theme.color.lightGray};

  ${theme.media.mobile} {
    font-size: 16px;
  }
`;

const SelectStudentRoleButton = styled(ContainedButton)`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
`;

const SelectOrganizerRoleButton = styled(OutlinedButton)`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
`;

type RegistrationContentProps = {
  role: ROLE;
  mode: MODE;
  onSelectRole(role: ROLE): void;
  onSelectMode(mode: MODE): void;
  setLoggingIn(isLoggingIn: boolean): void;
};

const RegistrationContent: React.FC<RegistrationContentProps> = ({
  role,
  mode,
  onSelectRole,
  onSelectMode,
  setLoggingIn,
}) => {
  const onFinish = async (registrationValues: any) => {
    console.log("Submitted:", registrationValues);
    if (role === ROLE.STUDENT) {
      // todo: edit
      const { studentId, email, password, firstName, lastName } =
        registrationValues;
      try {
        await registration.registerStudent({
          studentId,
          email,
          password,
          firstName,
          lastName,
        } as registerStudentParams);
        onSelectMode(MODE.DONE);
      } catch (err) {
        console.log(err);
        onSelectMode(MODE.FAIL);
      }
    } else if (role === ROLE.ORGANIZER) {
      const { organizerEmail, organizerName, coordinatorName, phone } =
        registrationValues;
      try {
        await registration.registerOrganizer({
          email: organizerEmail,
          name: organizerName,
          coorName: coordinatorName,
          phone,
        } as registerOrganizerParams);
        onSelectMode(MODE.DONE);
      } catch (err) {
        console.log(err);
        onSelectMode(MODE.FAIL);
      }
    }
  };

  const subtitle1 =
    mode === MODE.FAIL
      ? "Create failed"
      : role === ROLE.ORGANIZER
      ? "Your request has been successfully summited"
      : "You are ready to dance!!";

  const subtitle2 =
    role === ROLE.ORGANIZER
      ? "The request will be reviewed and processed as soon as posible."
      : null;

  const FormItems =
    role === ROLE.ORGANIZER ? (
      <>
        <Form.Item
          name="organizerEmail"
          rules={[
            {
              type: "email",
              message: "Please enter a valid E-mail.",
            },
            {
              required: true,
              message: "Please enter your E-mail.",
            },
          ]}
        >
          <Input placeholder="organizer email"></Input>
        </Form.Item>
        <Form.Item
          name="organizerName"
          rules={[{ required: true, message: "Please enter your name." }]}
        >
          <Input placeholder="organizer name" />
        </Form.Item>
        <Form.Item
          name="coordinatorName"
          rules={[
            {
              required: true,
              message: "Please enter your coordinator name.",
            },
          ]}
        >
          <Input placeholder="coordinator name" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter your phone number.",
            },
            {
              type: "string",
              min: 9,
              max: 9,
              message: "Please enter valid phone number.",
            },
          ]}
        >
          <Input placeholder="Tel." />
        </Form.Item>
        <Form.Item name="description">
          <TextArea rows={4} placeholder="description" />
        </Form.Item>
        <Form.Item>
          <OperationButtonContainer>
            <Button
              style={{ width: 150 }}
              onClick={() => onSelectMode(MODE.SELECTROLE)}
            >
              Back
            </Button>
            <Button type="primary" style={{ width: 150 }} htmlType="submit">
              Submit
            </Button>
          </OperationButtonContainer>
        </Form.Item>
      </>
    ) : role === ROLE.STUDENT ? (
      <>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid E-mail",
            },
            {
              required: true,
              message: "Please enter your E-mail",
            },
          ]}
        >
          <Input id="sr-email" placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter a password" },
            {
              type: "string",
              min: 8,
              message: "password length must be more than 8 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            id="sr-password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Those passwords did not match. Try again.")
                );
              },
            }),
          ]}
        >
          <Input.Password
            id="sr-confirm-password"
            placeholder="confirm password"
          />
        </Form.Item>
        <Form.Item
          name="studentId"
          rules={[
            {
              required: true,
              message: "Please enter your CU-student id",
            },
            {
              type: "string",
              min: 10,
              max: 10,
              message: "Please enter a valid CU-student id",
            },
          ]}
        >
          <Input id="sr-studentid" placeholder="CU student ID" />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter your firstname",
            },
          ]}
        >
          <Input
            id="sr-firstname"
            placeholder="First name"
          ></Input>
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your lastname",
            },
          ]}
        >
          <Input id="sr-lastname" placeholder="Last name"></Input>
        </Form.Item>
        <Form.Item>
          <OperationButtonContainer>
            <Button
              style={{ width: 150 }}
              onClick={() => onSelectMode(MODE.SELECTROLE)}
            >
              Back
            </Button>
            <Button
              id="sr-submit-button"
              type="primary"
              style={{ width: 150 }}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </OperationButtonContainer>
        </Form.Item>
      </>
    ) : null;

  return (
    <>
      {mode === MODE.SELECTROLE ? (
        <SelectRoleButtonContainer>
          <SelectStudentRoleButton
            id="cu-student"
            text={"CU Student"}
            onClick={() => onSelectRole(ROLE.STUDENT)}
          >
            <SelectRoleButtonText>CU Student</SelectRoleButtonText>
          </SelectStudentRoleButton>
          <SelectOrganizerRoleButton
            text={"Organizer"}
            onClick={() => onSelectRole(ROLE.ORGANIZER)}
          >
            <SelectRoleButtonText>Organizer</SelectRoleButtonText>
          </SelectOrganizerRoleButton>
        </SelectRoleButtonContainer>
      ) : mode === MODE.SIGNUP ? (
        <RegistrationWrapper>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            style={{ width: "100%" }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {FormItems}
          </Form>
        </RegistrationWrapper>
      ) : mode === MODE.DONE ? (
        <DonePageContainer>
          <SubtitleText1>{subtitle1}</SubtitleText1>
          <SubtitleText2>{subtitle2}</SubtitleText2>
          <Button type="primary" onClick={() => setLoggingIn(true)}>
            Log in
          </Button>
        </DonePageContainer>
      ) : mode === MODE.FAIL ? (
        <DonePageContainer>
          <SubtitleText1>{subtitle1}</SubtitleText1>
          <div>
            <SubtitleText2>This email or student id</SubtitleText2>
            <SubtitleText2>has already been registered.</SubtitleText2>
          </div>
          <OperationButtonContainer>
            <Button
              onClick={() => onSelectMode(MODE.SIGNUP)}
              style={{ width: 150 }}
            >
              Try again
            </Button>
            <Button
              type="primary"
              onClick={() => setLoggingIn(true)}
              style={{ width: 150 }}
            >
              Log in
            </Button>
          </OperationButtonContainer>
        </DonePageContainer>
      ) : null}
    </>
  );
};

export default RegistrationContent;

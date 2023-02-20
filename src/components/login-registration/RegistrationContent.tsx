import React, { useState, useEffect } from "react";

import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import { USER_ROLE_REF } from "@/utils/Enum";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import theme from "@/utils/theme";
import { registerStudent } from "api";

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

const DoneWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap:30px;
    padding-right: 12%;
    padding-left: 12%;
    padding-top: 15%;
`;

const OperationButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const SelectRoleButtonWrapper = styled.div`
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
    color: ${theme.color_level.gray.medium};

    ${theme.media.mobile} {
        font-size: 16px;
    }
`;

const MODE = {
    SELECTROLE: "selectRole",
    SIGNUP: "signUp",
    DONE: "done",
};

type RegistrationContentProps = {
    role: string;
    mode: string;
    onSelectRole(role: string): void;
    onSelectMode(mode: string): void;
    toggleRegistrationModal(): void;
    onRegistration: boolean;
};

const RegistrationContent: React.FC<RegistrationContentProps> = ({
    role,
    mode,
    onSelectRole,
    onSelectMode,
    onRegistration,
    toggleRegistrationModal,
}) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Success:", values);
        if (role === USER_ROLE_REF.STUDENT) {
            const studentId = values.studentId;
            const email = values.email;
            const password = values.password;
            const firstName = values.firstname;
            const lastName = values.lastname;
            const image = "image1";
            const cardId = "cardID1";
            registerStudent(studentId, email, password, firstName, lastName, image, cardId);
        } else if (role === USER_ROLE_REF.ORGANIZER) {
            const email = values.organizerEmail;
            const name = values.organizerName;
            const coorName = values.coordinatorName;
            const phone = values.phone;
            const description = values.description;

            axios
                .post("http://localhost:3001/register/organizer", {
                    email,
                    name,
                    coorName,
                    phone,
                    description,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }

        onSelectMode(MODE.DONE);
    };

    const subtitle1 =
        role === USER_ROLE_REF.ORGANIZER
            ? "Your request has been successfully summited"
            : "You are ready to dance!!";

    const subtitle2 =
        role === USER_ROLE_REF.ORGANIZER
            ? "The request will be reviewed and processed as soon as posible."
            : null;

    const FormItems =
        role === USER_ROLE_REF.ORGANIZER ? (
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
                    rules={[
                        { required: true, message: "Please enter your name." },
                    ]}
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
                    <OperationButtonWrapper>
                        <Button
                            type="primary"
                            style={{ width: 150 }}
                            onClick={() => onSelectMode(MODE.SELECTROLE)}
                        >
                            Back
                        </Button>
                        <Button
                            type="primary"
                            style={{ width: 150 }}
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </OperationButtonWrapper>
                </Form.Item>
            </>
        ) : role === USER_ROLE_REF.STUDENT ? (
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
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Please enter a password" },
                        {
                            type: "string",
                            min: 8,
                            message:
                                "password length must be more than 8 characters",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="password" />
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
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Those passwords did not match. Try again."
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="confirm password" />
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
                            message:
                                "Please enter a valid CU-student id",
                        },
                    ]}
                >
                    <Input placeholder="CU student ID" />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your firstname",
                        },
                    ]}
                >
                    <Input placeholder="Firstname"></Input>
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your lastname",
                        },
                    ]}
                >
                    <Input placeholder="Lastname"></Input>
                </Form.Item>
                {/* <Form.Item 
				name="birthdate"
				rules={[{required: true, message: 'Please enter your birthdate'}]}
			>
				<DatePicker/>
			</Form.Item> */}
                <Form.Item>
                    <OperationButtonWrapper>
                        <Button
                            type="primary"
                            style={{ width: 150 }}
                            onClick={() => onSelectMode(MODE.SELECTROLE)}
                        >
                            Back
                        </Button>
                        <Button
                            type="primary"
                            style={{ width: 150 }}
                            htmlType="submit"
                        >
                            Sign Up
                        </Button>
                    </OperationButtonWrapper>
                </Form.Item>
            </>
        ) : null;

    return (
        <>
            {mode === MODE.SELECTROLE ? (
                <SelectRoleButtonWrapper>
                    <Button
                        style={{
                            width: "100%",
                            height: 200,
                            marginBottom: 20,
                            backgroundColor: "#F96491",
                            color: "white",
                        }}
                        onClick={() => onSelectRole(USER_ROLE_REF.STUDENT)}
                    >
                        <SelectRoleButtonText>CU Student</SelectRoleButtonText>
                    </Button>
                    <Button
                        style={{
                            width: "100%",
                            height: 200,
                            backgroundColor: "#BABABA",
                            color: "#454545",
                        }}
                        onClick={() => onSelectRole(USER_ROLE_REF.ORGANIZER)}
                    >
                        <SelectRoleButtonText>Organizer</SelectRoleButtonText>
                    </Button>
                </SelectRoleButtonWrapper>
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
                <DoneWrapper>
                    <SubtitleText1>{subtitle1}</SubtitleText1>
                    <SubtitleText2>{subtitle2}</SubtitleText2>
                    <Button
                        type="primary"
                        onClick={() => toggleRegistrationModal()}
                    >
                        Back to home
                    </Button>
                </DoneWrapper>
            ) : null}
        </>
    );
};

export default RegistrationContent;

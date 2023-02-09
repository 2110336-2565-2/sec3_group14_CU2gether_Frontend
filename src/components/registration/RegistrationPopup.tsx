import React, { useState, useEffect } from "react"

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd'
import { USER_ROLE_REF, GENDER_REF } from "@/utils/Enum";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import theme from '@/utils/theme'

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

	${theme.media.mobile} = {
		padding-left: 0%;
		padding-right: 0%;
	}
`;

const DoneWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding-top: 30%;
`;

const OperationButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
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
		font-size: 24px
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
	SELECTROLE: 'selectRole',
	SIGNUP: 'signUp',
	DONE: 'done'
}

const Registration: React.FC<{
		toggleRegistrationModal():void,
        onRegistration:boolean,
    }> = ({onRegistration, toggleRegistrationModal}) => {

	const [form] = Form.useForm();

	const [mode, setMode] = useState(MODE.SELECTROLE);
	const [role, setRole] = useState('');

	const onSelectRole = (role: string) => {
		setMode(MODE.SIGNUP);
		setRole(role);
	}

	const onFinish = (values: any) => {
		console.log('Success:', values);
		setMode(MODE.DONE);
	 };

	const title =
		mode === MODE.SELECTROLE
		? 'Who are you?'
		: mode === MODE.SIGNUP 
		? role === USER_ROLE_REF.ORGANIZER
		? 'Request Form' : 'Sign Up'
		: null;
	
	const subtitle1 =
	 	role === USER_ROLE_REF.ORGANIZER
		? 'Your request has been successfully summited' 
		: 'You are ready to dance!!';
	
	const subtitle2 = 
		role === USER_ROLE_REF.ORGANIZER
		? 'The request will be reviewed and processed as soon as posible.'
		: null;

	const FormItems =
		role === USER_ROLE_REF.ORGANIZER ?
		(<>
			<Form.Item 
				name="organizerEmail"
				rules={[
					{
						type: 'email',
						message: 'Please enter a valid E-mail.',
					},
					{
						required: true,
						message: 'Please enter your E-mail.',
					},
				]}
			>
				<Input placeholder="organizer email"></Input>
			</Form.Item>
			<Form.Item 
				name="organizerName"
				rules={[{required: true, message: 'Please enter your name.'}]}
			>
				<Input placeholder="organizer name"/>
			</Form.Item>
			<Form.Item
				name="coordinatorName"
				rules={[{required: true, message: 'Please enter your coordinator name.'}]}
			>
				<Input placeholder="coordinator name" />
			</Form.Item>
			<Form.Item 
				name="phone"
				rules={[{required: true, message: 'Please enter your phone number.'}, {type: 'string', min:10, max: 10, message: 'Please enter valid phone number.'}]}
			>
				<Input placeholder="Tel."/>
			</Form.Item>
			<Form.Item name="description">
				<TextArea rows={4} placeholder="description" />
			</Form.Item>
			<Form.Item>
				<OperationButtonWrapper>
					<Button 
						type="primary"
						onClick={() => setMode(MODE.SELECTROLE)}
					>
						Back
					</Button>
					<Button 
						type="primary" 
						htmlType="submit" 
					>
						Submit
					</Button>
				</OperationButtonWrapper>
			</Form.Item></>) : 
			role === USER_ROLE_REF.STUDENT ?
			(<><Form.Item
				name="email"
				rules={[
					{
						type: 'email',
						message: 'Please enter a valid E-mail',
					},
					{
						required: true,
						message: 'Please enter your E-mail',
					},
				]}
			>
				<Input placeholder="email"/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please enter a password',
					},
				]}
				hasFeedback
			>
				<Input.Password placeholder="password" />
			</Form.Item>
			<Form.Item
				name="confirm"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve()
							}
							return Promise.reject(new Error('Those passwords did not match. Try again.'))
						},
					}),
				]}
			>
				<Input.Password placeholder="confirm password" />
			</Form.Item>
			<Form.Item
				name="studentId"
				rules={[{required: true, message: 'Please enter your CU-student id'}]}
			>
				<Input 
					placeholder="CU student ID"
				/>
			</Form.Item>
			<Form.Item
				name="firstname"
				rules={[{required: true, message: 'Please enter your firstname'}]}
			>
				<Input placeholder="Firstname"></Input>
			</Form.Item>
			<Form.Item
				name="lastname"
				rules={[{required: true, message: 'Please enter your lastname'}]}
			>
				<Input placeholder="Lastname"></Input>
			</Form.Item>
			<Form.Item 
				name="birthdate"
				rules={[{required: true, message: 'Please enter your birthdate'}]}
			>
				<DatePicker/>
			</Form.Item>
			<Form.Item>
				<OperationButtonWrapper>
					<Button
						type="primary"
						onClick={() => setMode(MODE.SELECTROLE)}
					>
						Back
					</Button>
					<Button 
						type="primary"
						htmlType="submit" 
					>
						Sign Up
					</Button>
				</OperationButtonWrapper>
			</Form.Item>
		</>) : null;

    return ( 
		<Modal
			open={onRegistration}
			width={600}
			centered={true}
			closable={true}
			afterClose={() => setMode(MODE.SELECTROLE)}
			bodyStyle={{minHeight: 500}}
			closeIcon={<FontAwesomeIcon onClick={() => toggleRegistrationModal()} icon={faCircleXmark} size={"2x"} />}
			footer={null}
			title={<RegistrationTitle>{title}</RegistrationTitle>}
		>	
				{
				mode === MODE.SELECTROLE ? 
					(<SelectRoleButtonWrapper>
						<Button
							style={{width: '100%', height: 200, marginBottom: 20, backgroundColor: '#F96491', color:'white'}}
							onClick={() => onSelectRole(USER_ROLE_REF.STUDENT)}
						>
							<SelectRoleButtonText>CU Student</SelectRoleButtonText>
						</Button>
						<Button
							style={{width: '100%', height: 200, backgroundColor: '#BABABA', color: '#454545'}}
							onClick={() => onSelectRole(USER_ROLE_REF.ORGANIZER)}
						>
							<SelectRoleButtonText>Organizer</SelectRoleButtonText>
						</Button>
					</SelectRoleButtonWrapper>) : 
				mode === MODE.SIGNUP ?
					(
					<RegistrationWrapper>
						<Form
							name="basic"
							layout="vertical"
							initialValues={{ remember: true }}
							style={{width:'100%'}}
							onFinish={onFinish}
							autoComplete="off"
						>
							{FormItems}
						</Form>
					</RegistrationWrapper>) :
				mode === MODE.DONE ?
					(<DoneWrapper>
						<SubtitleText1>{subtitle1}</SubtitleText1>
						<SubtitleText2>{subtitle2}</SubtitleText2>
						<Button type="primary" onClick={() => toggleRegistrationModal()}>Back to home</Button>
					</DoneWrapper>) : null
				}
		</Modal>
	)
}

export default Registration;

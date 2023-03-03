import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getStudentById, updateStudentById } from 'api';
import { Input, Layout, Form, Button } from 'antd';
import styled from 'styled-components';
import theme from '@/utils/theme';
import FormInput from '@/components/basic-components/FormInput';

const EditProfileContainer = styled(Layout)`
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    width: 800px;
    background-color: ${theme.color.white};
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledInput = styled(Input)`
  height: 45px;
  font-size: 20px;

  ${theme.media.mobile} {
    height: 31px;
    font-size: 14px;
  }
`;

const OperationButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const OperationButton = styled(Button)`
  width: 180px;
  height: 44px;
  font-size: 20px;
`;

const profile = {
    email: String,
    studentId: String,
    firstName: String,
    lastName: String
}

const EditProfilePage: React.FC<{}> = ({}) => {
    const [profile, setProfile] = useState({email: "John@Doe.com", studentId: "6330123456",firstName: "John", lastName: "Doe"});

    const router = useRouter();
    
    useEffect(() => {
      getStudentById('6330476521')
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.log(err))
    },[]);

    const onFinish = (values: any) => {
      const {email, newPassword, studentId, firstname, lastname} = values;
      const image = "image1";
      const cardId = "cardID1";
      updateStudentById(studentId, email, newPassword, firstname, lastname, image, cardId);
    }
    
    const onCancle = () => {
      router.push('/profile');
    }

    return (
      <EditProfileContainer>
        <FormContainer onFinish={onFinish}>
          <FormInput text="Email" name="email">
            <StyledInput disabled defaultValue={profile.email}></StyledInput>
          </FormInput>
          <FormInput text="Student ID" name="studentID">
            <StyledInput disabled defaultValue={profile.studentId}></StyledInput>
          </FormInput>
          <FormInput text="Firstname" name="firstName">
            <StyledInput placeholder="firstname" defaultValue={profile.firstName}></StyledInput>
          </FormInput>
          <FormInput text="Lastname" name="lastName">
            <StyledInput placeholder="lastname" defaultValue={profile.lastName}></StyledInput>
          </FormInput>
          <FormInput text="Password" name="oldPassword">
            <StyledInput placeholder="Old Password"></StyledInput>
          </FormInput>
          <FormInput text="" name="newPassword">
            <StyledInput placeholder="New Password"></StyledInput>
          </FormInput>
          <FormInput text="" name="confirmPassword">
            <StyledInput placeholder="Confirm New Password"></StyledInput>
          </FormInput>
          <Form.Item>
            <OperationButtonContainer>
              <OperationButton type="default" onClick={() => onCancle()}>
                Cancle
              </OperationButton>
              <OperationButton type="primary" htmlType="submit">
                Save
              </OperationButton>
            </OperationButtonContainer>
          </Form.Item>
        </FormContainer>
      </EditProfileContainer>
    );
};

export default EditProfilePage;

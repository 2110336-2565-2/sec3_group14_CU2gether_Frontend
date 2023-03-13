import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getStudentById, updateStudentById } from 'api/student';
import { Input, Layout, Form, Button, Skeleton } from 'antd';
import styled from 'styled-components';
import theme from '@/utils/theme';
import FormInput from '@/components/basic-components/FormInput';

const EditProfileContainer = styled(Layout)`
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    max-width: 800px;
    width: 100%;
    background-color: ${theme.color.white};
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledInput = styled(Input)`
  height: 40px;
  font-size: 18px;

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
  height: 40px;
  font-size: 18px;
`;

interface profile {
    email: string,
    studentId: string,
    firstName: string,
    lastName: string
}

const EditProfilePage: React.FC<{}> = ({}) => {
    const [profile, setProfile] = useState<profile>({email: "John@Doe.com", studentId: "6330123456",firstName: "John", lastName: "Doe"});

    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
      if(typeof uid !== 'undefined') {
        getStudentById(uid.toString())
        .then((data) => {
          setProfile({email: data.email, studentId: data.studentId, firstName: data.firstName, lastName: data.lastName});
        })
        .catch((err) => console.log(err))
      } 
    },[]);

    const onFinish = (values: any) => {
      const {email, newPassword, studentId, firstname, lastname} = values;
      const image = "image1";
      const cardId = "cardID1";
      updateStudentById(studentId, email, newPassword, firstname, lastname, image, cardId);
    }
    
    const onCancle = () => {
      router.push(`/profile/${uid}`);
    }

    return (
      <EditProfileContainer>
        <FormContainer onFinish={onFinish}>
          <FormInput title="Email" name="email">
            <StyledInput disabled defaultValue={profile.email}></StyledInput>
          </FormInput>
          <FormInput title="Student ID" name="studentID">
            <StyledInput disabled defaultValue={profile.studentId}></StyledInput>
          </FormInput>
          <FormInput title="Firstname" name="firstName">
            <StyledInput placeholder="firstname" defaultValue={profile.firstName}></StyledInput>
          </FormInput>
          <FormInput title="Lastname" name="lastName">
            <StyledInput placeholder="lastname" defaultValue={profile.lastName}></StyledInput>
          </FormInput>
          <FormInput title="Password" name="oldPassword" isRequired={true}>
            <StyledInput placeholder="Old Password"></StyledInput>
          </FormInput>
          <FormInput title="New Password" name="newPassword" isRequired={true}>
            <StyledInput placeholder="New Password"></StyledInput>
          </FormInput>
          <FormInput title="Confirn Password" name="confirmPassword" isRequired={true}>
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

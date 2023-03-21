import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getStudentById, updateStudentById } from 'api/student';
import { Input, Layout, Form, Button, Skeleton, Typography } from 'antd';
import styled from 'styled-components';
import theme from '@/utils/theme';
import FormInput from '@/components/basic-components/FormInput';

const { Text } = Typography;

const EditProfileContainer = styled(Layout)`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  max-width: 800px;
  width: 100%;
  background-color: ${theme.color.white};
`;

const ManageAccountTitleWrapper = styled.div`
  margin-left: -40vw;
  margin-bottom: 30px;
`;

const ManageAccountTitle = styled(Text)`
  font-size: 36px;
  font-weight: bold;

  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  gap: 30px;

  ${theme.media.mobile} {
    width: 309px;
    font-size: 14px;
    gap: 10px;
  }
`;

const StyledInput = styled(Input)`
  height: 40px;
  font-size: 18px;

  ${theme.media.mobile} {
    width: 205px;
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

  ${theme.media.mobile} {
    height: 31px;
    width: 120px;
    font-size: 14px;
  }
`;

interface profile {
    email: string,
    studentId: string,
    firstName: string,
    lastName: string
}

const EditProfilePage: React.FC<{}> = ({}) => {
    const [profile, setProfile] = useState<profile>({email: "John@Doe.com", studentId: "6330123456",firstName: "John", lastName: "Doe"});
    const [isLoading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
      setLoading(true);
      if(uid) {
        getStudentById(uid.toString())
        .then((data) => {
          setProfile({email: data.email, studentId: data.studentId, firstName: data.firstName, lastName: data.lastName});
          setLoading(false);
        })
        .catch((err) => console.log(err))
      } 
    },[uid]);

    const onFinish = (values: any) => {
      const {email, newPassword, studentId, firstname, lastname} = values;
      const image = "image1";
      const cardId = "cardID1";
      updateStudentById(studentId, email, newPassword, firstname, lastname, image, cardId);
    }
    
    const onCancle = () => {
      router.push(`/profile/${uid}`);
    }

    if(isLoading) return <Skeleton></Skeleton>

    return (
      <EditProfileContainer>
        <ManageAccountTitleWrapper>
          <ManageAccountTitle>Manage Account</ManageAccountTitle>
        </ManageAccountTitleWrapper>
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
          <FormInput title="" name="newPassword" >
            <StyledInput placeholder="New Password"></StyledInput>
          </FormInput>
          <FormInput title="" name="confirmPassword">
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

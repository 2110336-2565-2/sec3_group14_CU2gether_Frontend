import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Layout, Form, Button, Typography, message, Result } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import FormInput from "@/common/input/FormInput";
import useProfileStore from "@/hooks/useProfileStore";
import { LockReset } from "@mui/icons-material";
import { ROLE } from "@/types";
import CenteredModal from "@/common/modal";
import { OutlinedButton } from "@/common/button";

const { Text } = Typography;

const EditProfilePage: React.FC<{}> = ({}) => {
  const [ form ] = Form.useForm();
  const { id, role, resetPassword } = useProfileStore();
  const [ isError, setError ] = useState<boolean>(false);

  const router = useRouter();

  const onFinish = async (values: any) => {
    const { oldPassword, newPassword } = values;
    if(id) {
      try {
        await resetPassword( id, role ? role : ROLE.STUDENT, { oldPassword, newPassword });
        message.success('Password changed successfully!');
        router.back();
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }
  };

  const onCloseModal = () => {
    setError(false);
    form.resetFields();
  }

  const renderErrorResult = () => (
    <CenteredModal 
      open={isError}
      footer={null}
    >
      <ModalContent>
        <Result
          status = "error"
          title = "Incorrect Password"
          style = {{padding: 10}}  
        >
        </Result>
        <OutlinedButton text="Close" onClick = {() => onCloseModal()}/>
      </ModalContent>
    </CenteredModal>
  )

  return (
    <EditProfileContainer>
      <ChangePasswordTitleWrapper>
        <ChangePasswordTitle>Change Password</ChangePasswordTitle>
      </ChangePasswordTitleWrapper>
      <ContentContainer>
        <FormContainer onFinish={onFinish} form={form}>
          <FormInput 
            title="Old Password" 
            name="oldPassword" 
            isRequired={true}
            rules={[
              { required: true, message: "Please enter a password" },
            ]}
          >
            <StyledInput placeholder="Old Password"/>
          </FormInput>
          <FormInput
            title="New password" 
            name="newPassword"
            isRequired={true}
            rules={[
              { required: true, message: "Please enter a new password" },
              {
                type: "string",
                min: 8,
                message: "password length must be more than 8 characters",
              },
            ]}
          >
            <StyledInput type="password" placeholder="New Password"/>
          </FormInput>
          <FormInput
            title="Confirm new password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            isRequired={true}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Those passwords did not match. Try again.")
                  );
                },
              }),
            ]}
          >
            <StyledInput
              type="password"
              placeholder="Confirm New Password"
            />
          </FormInput>
          <Form.Item>
            <OperationButtonContainer>
              <OperationButton type="default" onClick={() => router.back()}>
                Cancle
              </OperationButton>
              <OperationButton type="primary" htmlType="submit">
                Save
              </OperationButton>
            </OperationButtonContainer>
          </Form.Item>
        </FormContainer>
        <LockReset sx={{ fontSize: 250, display:{xs: 'none', sm: 'none', md: 'block'} }} style={{marginTop: -70}}/>
        </ContentContainer>
        {renderErrorResult()}
    </EditProfileContainer>
  );
};

const EditProfileContainer = styled(Layout)`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  max-width: 800px;
  width: 100%;
`;

const ChangePasswordTitleWrapper = styled.div`
  margin-left: -45vw;
  margin-bottom: 40px;
`;

const ChangePasswordTitle = styled(Text)`
  font-size: 36px;
  font-weight: bold;

  ${theme.media.tablet} {
    font-size: 24px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60vw;
  gap: 5vw;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
`;

export default EditProfilePage;

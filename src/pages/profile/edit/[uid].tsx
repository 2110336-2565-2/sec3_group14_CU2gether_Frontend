import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, Layout, Form, Button, Skeleton, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import FormInput from "@/common/input/FormInput";
import useProfileStore from "@/hooks/useProfileStore";
import { LockReset } from "@mui/icons-material";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonInput from "antd/es/skeleton/Input";
import { ROLE } from "@/utils/Enum";

const { Text } = Typography;

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

const EditProfilePage: React.FC<{}> = ({}) => {
  const { role, resetPassword } = useProfileStore();

  const [ loading, setLoading ] = useState<boolean>(false);

  const router = useRouter();
  const { uid } = router.query;

  const onFinish = async (values: any) => {
    const { oldPassword, password } = values;
    console.log(uid, values);
    if (uid) {
      setLoading(true);
      try {
        resetPassword(uid.toString(), role? role: ROLE.STUDENT, { oldPassword, password });
      } catch (error) {
        console.log(error);
      }
      router.push(`/profile/${uid}`);
      setLoading(false);
    }
  };

  if (loading) return (
    <Skeleton/>
    // <EditProfileContainer>
    //   <ContentContainer>
    //     <FormContainer>
    //       <Skeleton active paragraph={{rows: 0}}></Skeleton>
    //       <SkeletonInput active block={true} size="small"></SkeletonInput>
    //       <SkeletonInput active block={true} size="small"></SkeletonInput>
    //       <SkeletonInput active block={true} size="small"></SkeletonInput>
    //       <OperationButtonContainer>
    //         <SkeletonButton active ></SkeletonButton>
    //         <SkeletonButton active></SkeletonButton>
    //       </OperationButtonContainer>
    //     </FormContainer>
    //     <Skeleton.Avatar active size={200} ></Skeleton.Avatar>
    //   </ContentContainer>
    // </EditProfileContainer>
  )

  return (
    <EditProfileContainer>
      <ChangePasswordTitleWrapper>
        <ChangePasswordTitle>Change Password</ChangePasswordTitle>
      </ChangePasswordTitleWrapper>
      <ContentContainer>
        <FormContainer onFinish={onFinish}>
          <FormInput 
            title="Old Password" 
            name="oldPassword" 
            isRequired={true}
            rules={[
              { required: true, message: "Please enter a password" },
            ]}
          >
            <StyledInput placeholder="Old Password"></StyledInput>
          </FormInput>
          <FormInput
            title="New password" 
            name="password"
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
            <StyledInput type="password" placeholder="New Password"></StyledInput>
          </FormInput>
          <FormInput
            title="Confirm new password"
            name="confirmPassword"
            dependencies={["password"]}
            isRequired={true}
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
            <StyledInput
              type="password"
              placeholder="Confirm New Password"
            ></StyledInput>
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
    </EditProfileContainer>
  );
};

export default EditProfilePage;

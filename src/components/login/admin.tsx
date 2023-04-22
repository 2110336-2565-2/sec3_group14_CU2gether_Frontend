import React from "react";

import CenteredModal from "@/common/modal";
import styled from "styled-components";
import { Form, Input, message, Typography } from "antd";
import { useModal } from "@/hooks";
import { ContainedButton } from "@/common/button";
import admin from "@/pages/api/admin";
import { useRouter } from "next/router";

type LoginModalProps = {
  open: boolean;
  closeModal: () => void;
};

const { Title } = Typography;
const { Item } = Form;

export const AdminLoginModal: React.FC<LoginModalProps> = ({
  open,
  closeModal,
}) => {
  const router = useRouter();
  const loginHandler = async (values: any) => {
    try {
      const { email, password } = values;
      await admin.login(email, password);
      closeModal();
      router.reload();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <CenteredModal
      open={open}
      footer={null}
      closable={false}
      title={
        <ModalTitle>
          <Title>Admin Login</Title>
        </ModalTitle>
      }
    >
      <Form
        onFinish={loginHandler}
        onFinishFailed={() => console.log("log in failed")}
      >
        <Item
          name="email"
          rules={[
            {
              required: true,
              message: `Please enter your Email`,
            },
          ]}
        >
          <Input placeholder="email" />
        </Item>

        <Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your Password",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Item>

        <Item>
          <ButtonContainer>
            <ContainedButton htmlType="submit" text={"Log in"} />
          </ButtonContainer>
        </Item>
      </Form>
    </CenteredModal>
  );
};

const ModalTitle = styled.div`
  .ant-typography {
    font-size: 32px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

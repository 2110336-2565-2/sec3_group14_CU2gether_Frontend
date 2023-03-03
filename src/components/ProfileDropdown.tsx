import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import {
  QuestionOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import React from "react";
import theme from "@/utils/theme";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const OutlinedContainer = styled.div`
  font-size: 17px;
  font-weight: bold;
  height: 30px;
`;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <OutlinedContainer>
          <QuestionOutlined /> <Space />
          Support
        </OutlinedContainer>
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <OutlinedContainer>
          <LoginOutlined /> <Space />
          <Space />
          Login
        </OutlinedContainer>
      </a>
    ),
  },
];

const ProfileDropdownContainer = styled.div`
  padding: 40px;
  ${theme.media.mobile} {
    padding: 20px;
  }
`;

const StyledUserOutlined = styled(UserOutlined)`
  color: ${theme.color.white};
  font-size: 40px;
  width: 70px;
  height: 70px;
  padding: 0 15px;
  opacity: 0.9;
  ${theme.media.mobile} {
    padding: 0 8px;
    font-size: 20px;
    width: 35px;
    height: 35px;
  }
`;

const StyledUserOutlinedButton = styled.div`
  background-color: rgba(220, 220, 220, 0.243);
  border-radius: 50%;
  height: 70px;
  width: 70px;
  ${theme.media.mobile} {
    height: 35px;
    width: 35px;
  }
`;

const ProfileDropdown: React.FC = () => {
  return (
    <ProfileDropdownContainer className={inter.className}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayStyle={{ width: "340px" }}
          >
            <StyledUserOutlinedButton>
              <StyledUserOutlined />
            </StyledUserOutlinedButton>
          </Dropdown>
        </Space>
      </Space>
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;

import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import {
  QuestionOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import theme from "@/utils/theme";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <b>
          <div style={{ fontSize: "17px", height: "30px" }}>
            <QuestionOutlined /> <Space />
            Support
          </div>
        </b>
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <b>
          <div style={{ fontSize: "17px", height: "30px" }}>
            <LoginOutlined /> <Space />
            <Space />
            Login
          </div>
        </b>
      </a>
    ),
  },
];

const ProfileDropdownWrapper = styled.div`
  padding: 40px;
  ${theme.media.mobile} {
    padding: 20px;
  }
`;

const StyledUserOutlined = styled(UserOutlined)`
  color: white;
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

export default function ProfileDropdown() {
  return (
    <ProfileDropdownWrapper className={inter.className}>
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
    </ProfileDropdownWrapper>
  );
}

import { Button, Drawer } from "antd";
import styled from "styled-components";
import { Inter } from "@next/font/google";
import theme from "@/utils/theme";
import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const StyledMenuOutlined = styled(MenuOutlined)`
  color: white;
`;

const HamburgerMenuContainer = styled.div`
  display: none;
  ${theme.media.mobile} {
    display: inline;
  }
`;

const HamburgerMenuTitle = styled.div`
  margin-left: 70px;
  font-size: 24px;
  font-weight: bold;
`;

const ContentContainer = styled.div`
  font-size: 15px;
  margin-left: 20px;
  font-weight: bold;
  color: #454545;
`;

const CU = styled.span`
  color: ${theme.color.cu_pink};
`;

const Gether = styled.span`
  color: ${theme.color.gray};
`;

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <HamburgerMenuContainer className={inter.className}>
      <Button type="text" onClick={() => setOpen(true)}>
        <StyledMenuOutlined />
      </Button>
      <Drawer
        width={390}
        title={
          <HamburgerMenuTitle>
            <CU>CU</CU>
            <Gether>2Gether</Gether>
          </HamburgerMenuTitle>
        }
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <ContentContainer>
          <h4>Home</h4>
          <br />
          <h4>Explore Events</h4>
          <br />
          <h4>My Events</h4>
          <br />
          <h4>Create Event</h4>
        </ContentContainer>
      </Drawer>
    </HamburgerMenuContainer>
  );
};

export default HamburgerMenu;

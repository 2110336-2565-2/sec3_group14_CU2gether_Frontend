import React, { useState } from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import { MenuOutlined } from "@ant-design/icons";

const StyledMenuOutlined = styled(MenuOutlined)`
  color: white;
`;

const HamburgerMenuWrapper = styled.div`
  display: none;
  ${theme.media.mobile} {
    display: inline;
  }
`;

const HamburgerMenuTitle = styled.div`
  font-size: 24px;
  margin-left: 70px;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  font-size: 15px;
  margin-left: 20px;
  font-weight: bold;
  color: #454545;
`;

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <HamburgerMenuWrapper>
      <Button type="text" onClick={() => setOpen(true)}>
        <StyledMenuOutlined />
      </Button>
      <Drawer
        width={390}
        title={
          <HamburgerMenuTitle>
            <span style={{ color: "#F96491" }}>CU</span>
            <span style={{ color: "#BABABA" }}>2Gether</span>
          </HamburgerMenuTitle>
        }
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <ContentWrapper>
          <p>Home</p>
          <br />
          <p>Explore Events</p>
          <br />
          <p>My Events</p>
          <br />
          <p>Create Event</p>
        </ContentWrapper>
      </Drawer>
    </HamburgerMenuWrapper>
  );
};

export default HamburgerMenu;

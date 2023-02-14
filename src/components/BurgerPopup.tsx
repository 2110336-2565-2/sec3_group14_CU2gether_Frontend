import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import styled from 'styled-components';
import { Inter } from "@next/font/google";
import theme from '@/utils/theme';

const inter = Inter({ subsets: ["latin"] });

const MenuForMoblie = styled.img`
  background-image: url('burger.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 18px;
  height: 15px;
`

const Wrapper = styled.div`
  display: none;
  ${theme.media.mobile} {
      display: inline;
  }
`

const BurgerPopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper className={inter.className}>
      <Button type="text" onClick={showDrawer}>
        <MenuForMoblie/>
      </Button>
      <Drawer width={390} title={<div style={{fontSize:"24px",marginLeft:"70px",fontWeight:"bold"}}><div style={{color:"#F96491",display:"inline"}}>CU</div><div style={{color:"#BABABA",display:"inline"}}>2Gether</div></div>} placement="left" onClose={onClose} open={open}>
        <div style={{fontSize:"15px",marginLeft:"20px",fontWeight:"bold",color:"#454545"}}>
          <p>Home</p>
          <br />
          <p>Explore Events</p>
          <br />
          <p>My Events</p>
          <br />
          <p>Create Event</p>
        </div>
      </Drawer>
    </Wrapper>
  );
};

export default BurgerPopup;
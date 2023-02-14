import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

const Burger = styled.img`
  background-image: url('burger.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 18px;
  height: 15px;
`

const BurgerPopup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="text" onClick={showModal} >
        <Burger/>
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <b>
            <p>Home</p>
            <br />
            <p>Explore Events</p>
            <br />
            <p>My Events</p>
            <br />
            <p>Create Event</p>
        </b>
      </Modal>
    </>
  );
};

export default BurgerPopup;
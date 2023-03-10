import React from "react";
import Image from "next/image";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography } from "antd";
import { useModal } from "@/hooks";
import CenteredModal from "@/common/modal";
import ContainedButton, { OutlinedButton } from "@/common/button";

type EventCardProps = {
  event: {
    id: number;
    srcImg: string;
    altImg: string;
    date: Dayjs;
    name: string;
    join: boolean;
  };
};

const { Title } = Typography;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { srcImg, altImg, date, name } = event;

  const modalFooter = (
    <Space align="end">
      <OutlinedButton text="Description" />
      <ContainedButton text={event.join ? "Unjoin" : "Join"} />
    </Space>
  );

  return (
    <>
      <EventContainer direction="vertical" onClick={openModal}>
        <Image src={srcImg} alt={altImg} width={100} height={100} />
        <Typography>{date.format("ddd, DD MMM YYYY")}</Typography>
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
      </EventContainer>
      <CenteredModal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        footer={modalFooter}
      >
        {event.name}
      </CenteredModal>
    </>
  );
};

const EventContainer = styled(Space)`
  border: 1px solid;
  border-radius: 8px;
  width: 12.5vw;
  min-width: 200px;
  padding: 20px;
  margin: 5px;
`;

const ModalFooterContainer = styled(Space)`
  width: 100%;
`;

export default EventCard;

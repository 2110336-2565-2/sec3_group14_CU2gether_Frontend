import React from "react";
import Image from "next/image";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography } from "antd";
import { useModal } from "@/hooks";
import CenteredModal from "@/common/modal";
import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import { Event } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type EventCardProps = {
  event: Event;
};

const { Title } = Typography;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { srcImg, altImg, date, name, location } = event;

  const modalFooter = (
    <Space align="end">
      <OutlinedButton text="Description" />
      <ContainedButton text={event.join ? "Unjoin" : "Join"} />
    </Space>
  );

  return (
    <>
      <EventContainer direction="vertical" onClick={openModal}>
        <ImageContainer>
          <Image src={srcImg} alt={altImg} width={150} height={200} />
        </ImageContainer>
        <Typography>{date.format("ddd, DD MMM YYYY")}</Typography>
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
        <LocationContainer>
          <LocationOnIcon />
          <Typography>{location}</Typography>
        </LocationContainer>
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
  width: 22.5vw;
  min-width: 150px;
  padding: 2vw;
  :hover {
    background-color: ${theme.color.backgroundOnHover};
  }
`;

const ImageContainer = styled(Space)`
  width: 100%;
  justify-content: center;
`;

const LocationContainer = styled(Space)`
  color: ${theme.color.secondary};
`;

export default EventCard;

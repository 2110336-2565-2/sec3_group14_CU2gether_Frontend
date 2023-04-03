import React from "react";
import { Space, Typography } from "antd";
import { Event } from "@/types";
import dayjs from "dayjs";
import styled from "styled-components";
import { CU_API } from "@/config";
import theme from "@/utils/theme";

const EventCard = styled.div`
  margin-top: 10px;
`;

const EventImage = styled.img`
  width: 400px;
  height: 265px;
  border-radius: 4px;

  ${theme.media.tablet} {
    width: 100%;
    height: 265px;
  }
`;

const TextContainer = styled.div`
  margin-top: -80px;
  margin-left: 20px;
  z-index: 1;
`;

type EventCardProps = {
  event: Event;
};

const { Title } = Typography;

const EventCardInProfile: React.FC<EventCardProps> = ({ event }) => {
  const { pictures, startDate, endDate, eventName } = event;

  const getDateTimeText = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    if (start.isSame(end, "day")) {
      return start.format("ddd, DD MMM YYYY");
    } else if (start.isSame(end, "month")) {
      return `${start.format("DD")} - ${end.format("DD MMM YYYY")}`;
    } else if (start.isSame(end, "month")) {
      return `${start.format("DD MMM")} - ${end.format("DD MMM YYYY")}`;
    } else {
      return `${start.format("DD MMM YYYY")} - ${end.format("DD MMM YYYY")}`;
    }
  };

  return (
    <EventCard>
      <EventImage crossOrigin="anonymous" alt={"Event Image"} src={CU_API+pictures[0].substring(1)}/>
      <TextContainer>
        <Title level={4}>
          {eventName}
        </Title>
        <Space>
          <Typography>{getDateTimeText()}</Typography>
        </Space>
      </TextContainer>
    </EventCard>
  );
};

export default EventCardInProfile;

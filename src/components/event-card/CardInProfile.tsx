import React from "react";
import { Space, Typography } from "antd";
import { Event } from "@/types";
import dayjs from "dayjs";
import styled from "styled-components";
import { CU_API } from "@/config";
import theme from "@/utils/theme";
import Image from "next/image";

const EventCard = styled.div`
  margin-top: 10px;
`;

const ImageWrapper = styled.div`
  width: 400px;
  height: 265px;
  border-radius: 4px;
  position: relative;
  z-index: 0;
  ${theme.media.tablet} {
    width: 100%;
    height: 265px;
  }
`;

const TextContainer = styled.div`
  margin-top: -80px;
  margin-left: 20px;
  position: relative;
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

  const imgSrc = `${CU_API}${pictures[pictures.length - 1]}`;

  return (
    <EventCard>
      <ImageWrapper>
        <Image
          crossOrigin="anonymous"
          alt={"Event Image"}
          src={imgSrc}
          loader={() => imgSrc}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </ImageWrapper>
      <TextContainer>
        <Title style={{color: 'white'}} level={4}>{eventName}</Title>
        <Space>
          <Typography style={{color: 'white'}}>{getDateTimeText()}</Typography>
        </Space>
      </TextContainer>
    </EventCard>
  );
};

export default EventCardInProfile;

import React from "react";
import { Card, Carousel, Space, Typography } from "antd";
import { Event } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import styled from "styled-components";
import Image from "next/image";
import { CU_API } from "@/config";

type EventCardProps = {
  event: Event;
};

const { Title } = Typography;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { pictures, startDate, endDate, eventName, location } = event;
  const imgSrc = `${CU_API}${pictures[pictures.length - 1]}`;

  const getDateTimeText = () => {
    const start = dayjs(startDate, "YYYY-MM-DD");
    const end = dayjs(endDate, "YYYY-MM-DD");
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
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <ImageContainer>
            <Image
              alt={"Event Image"}
              src={imgSrc}
              loader={() => imgSrc}
              crossOrigin="anonymous"
              fill
              style={{ objectFit: "cover" }}
            />
          </ImageContainer>
        }
      >
        <EventDetailContainer>
          <Title level={4} style={{ margin: "10px 0px" }}>
            {eventName}
          </Title>
          <Space>
            <CalendarMonthIcon fontSize="small" />
            <Typography>{getDateTimeText()}</Typography>
          </Space>
          <Space>
            <LocationOnIcon fontSize="small" />
            <Typography>{location}</Typography>
          </Space>
        </EventDetailContainer>
      </Card>
    </>
  );
};

const ImageContainer = styled.div`
  width: 240px;
  height: 240px;
  position: relative;
`;

const EventDetailContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 120px;
`;

export default EventCard;

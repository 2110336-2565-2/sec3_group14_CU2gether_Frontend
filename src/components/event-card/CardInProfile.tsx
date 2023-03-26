import React from "react";
import { Card, Space, Typography } from "antd";
import { Event } from "@/types";
import dayjs from "dayjs";
import styled from "styled-components";

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
    <>
      <Card
        hoverable
        style={{ width: '100%', height: '100%' }}
        cover={<img crossOrigin="anonymous" alt={"Event Image"} src={pictures[0]} />}
      >
        <Title level={4} style={{ margin: "10px 0px" }}>
          {eventName}
        </Title>
        <Space>
          <Typography>{getDateTimeText()}</Typography>
        </Space>
      </Card>
    </>
  );
};

export default EventCardInProfile;

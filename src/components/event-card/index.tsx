import React from "react";
import { Card, Space, Typography } from "antd";
import { Event } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type EventCardProps = {
  event: Event;
};

const { Title } = Typography;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { srcImg, altImg, date, name, location } = event;

  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={altImg} src={srcImg} />}
      >
        <Title level={4} style={{ margin: "10px 0px" }}>
          {name}
        </Title>
        <Space>
          <CalendarMonthIcon />
          <Typography>{date.format("ddd, DD MMM YYYY")}</Typography>
        </Space>
        <Space>
          <LocationOnIcon />
          <Typography>{location}</Typography>
        </Space>
      </Card>
    </>
  );
};

export default EventCard;

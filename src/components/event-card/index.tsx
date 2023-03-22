import React from "react";
import { Card, Carousel, Space, Typography } from "antd";
import { Event } from "@/types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";

type EventCardProps = {
  event: Event;
};

const { Title } = Typography;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { pictures, startDate, endDate, eventName, location } = event;

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
        cover={<img alt={"Event Image"} src={pictures[0]} />}
      >
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
      </Card>
    </>
  );
};

export default EventCard;

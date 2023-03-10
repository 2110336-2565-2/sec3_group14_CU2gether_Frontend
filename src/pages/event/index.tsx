import { SearchInput } from "@/common/input";
import EventCard from "@/components/event-card";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Space, Typography } from "antd";

type EventProps = {};

const { Title } = Typography;

const Event: React.FC<EventProps> = () => {
  const onSearch = async (value: string) => {};
  const onEnter = (e: any) => {};

  const events = [
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
    {
      src: "",
      alt: "event",
      date: dayjs("2021-01-01"),
      name: "event1",
      join: true,
    },
  ];

  const renderEventCardList = () =>
    events.map((event, idx) => (
      <EventCard key={`event-${idx}`} event={event} />
    ));

  return (
    <EventContainer direction="vertical">
      <HeaderContainer>
        <Title>Explore Events</Title>
        <Space>
          <SearchInput
            placeholder={"Search event by name..."}
            onSearch={onSearch}
            onEnter={onEnter}
          />
        </Space>
      </HeaderContainer>
      <DetailContainer wrap>{renderEventCardList()}</DetailContainer>
    </EventContainer>
  );
};

const EventContainer = styled(Space)`
  padding: 2.5vh 5vw;
  height: 100vh;
  width: 100vw;
`;

const HeaderContainer = styled.div`
  height: 15vh;
`;

const DetailContainer = styled(Space)`
  height: 100%;
  width: 100%;
`;

export default Event;

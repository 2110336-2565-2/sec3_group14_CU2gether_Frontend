import { SearchInput } from "@/common/input";
import EventCard from "@/components/event-card";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Cascader, Divider, Space, Typography } from "antd";
import ContainedButton from "@/common/button";

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

  const options: any[] = [
    {
      label: "Light",
      value: "light",
      children: new Array(20)
        .fill(null)
        .map((_, index) => ({ label: `Number ${index}`, value: index })),
    },
    {
      label: "Bamboo",
      value: "bamboo",
      children: [
        {
          label: "Little",
          value: "little",
          children: [
            {
              label: "Toy Fish",
              value: "fish",
            },
            {
              label: "Toy Cards",
              value: "cards",
            },
            {
              label: "Toy Bird",
              value: "bird",
            },
          ],
        },
      ],
    },
  ];

  const onFilterChange = (value: any, selectedOptions: any) => {
    console.log("tae", value, selectedOptions);
  };

  const dropdownRender = (menus: React.ReactNode) => (
    <Space direction="vertical" style={{ padding: "8px" }}>
      {menus}
      <Divider style={{ margin: 0 }} />
      <Space>
        <ContainedButton text="Apply" />
      </Space>
    </Space>
  );

  const renderEventCardList = () =>
    events.map((event, idx) => (
      <EventCard key={`event-${idx}`} event={event} />
    ));

  return (
    <EventContainer direction="vertical">
      <HeaderContainer>
        <Title>Explore Events</Title>
        <Space.Compact block>
          <SearchInput
            placeholder={"Search event by name..."}
            onSearch={onSearch}
            onEnter={onEnter}
          />
          <Cascader
            dropdownRender={dropdownRender}
            multiple
            onChange={onFilterChange}
            options={options}
            placeholder="Filter"
            showSearch
            maxTagCount="responsive"
            style={{ width: "30%" }}
          />
        </Space.Compact>
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

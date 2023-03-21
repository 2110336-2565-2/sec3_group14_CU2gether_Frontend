import { SearchInput } from "@/common/input";
import EventCard from "@/components/event-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  Card,
  Cascader,
  Divider,
  Empty,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { ContainedButton } from "@/common/button";
import useEventStore from "@/hooks/useEventStore";
import { Event } from "@/types";

type EventProps = {};

const { Title } = Typography;
const { Meta } = Card;
const { Image } = Skeleton;

const Event: React.FC<EventProps> = () => {
  const { events, fetchEvents } = useEventStore();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchEvents({});
      } catch (e) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSearch = async (value: string) => {
    fetchEvents({ searchKey: value });
  };
  const onEnter = (e: any) => {
    fetchEvents({ searchKey: e.target.value });
  };

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
    events.map((event: Event, idx: number) => (
      <EventCard key={`event-${idx}`} event={event} />
    ));

  if (loading)
    return (
      <EventContainer>
        <HeaderContainer>
          <Skeleton active />
        </HeaderContainer>
        <DetailContainer>
          {new Array(7).fill(null).map((_, index) => (
            <Card
              style={{ width: 240 }}
              cover={<Image style={{ width: 240 }} />}
            >
              <Skeleton loading={loading} active>
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
          ))}
        </DetailContainer>
      </EventContainer>
    );

  return (
    <EventContainer>
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
      {events ? (
        <DetailContainer>{renderEventCardList()}</DetailContainer>
      ) : (
        <EmptyWrapper>
          <Empty description={"No event"} />
        </EmptyWrapper>
      )}
    </EventContainer>
  );
};

const EventContainer = styled.div`
  padding: 2.5vh 5vw;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-flow: column;
  gap: 3%;
`;

const HeaderContainer = styled.div`
  height: fit-content;
`;

const DetailContainer = styled(Space)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-gap: 1rem;
  justify-content: space-around;
`;

const EmptyWrapper = styled.div`
  height: 100%;
`;

export default Event;

import { SearchInput } from "@/common/input";
import EventCard from "@/components/event-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  DatePicker,
  Divider,
  Empty,
  Radio,
  Skeleton,
  Space,
  TimePicker,
  Typography,
} from "antd";
import { ContainedButton } from "@/common/button";
import useEventStore from "@/hooks/useEventStore";
import { Event } from "@/types";
import { DropdownButton } from "@/common/dropdown";
import { useMediaQuery } from "react-responsive";

type EventProps = {};

const { Title } = Typography;
const { Meta } = Card;
const { Image } = Skeleton;
const { Group, Button } = Radio;

const Event: React.FC<EventProps> = () => {
  const { events, fetchEvents } = useEventStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);
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

  const onFilterChange = (value: any, selectedOptions: any) => {
    console.log("tae", value, selectedOptions);
  };

  const renderEventCardList = () =>
    events.map((event: Event, idx: number) => (
      <EventCard key={`event-${idx}`} event={event} />
    ));

  const renderDropdownContent = () => {
    if (isMobileScreen) {
      return (
        <DropdownContainer>
          <Row>
            <SearchInput placeholder={"Location"} style={{ width: "60%" }} />
            <DropdownButton
              text="Type"
              width="fit-content"
              dropdownComponent={<></>}
            />
          </Row>
          <Row>
            <Group>
              <Button value="ONSITE">Onsite</Button>
              <Button value="ONLINE">Online</Button>
            </Group>
          </Row>
          <Row>
            <DatePicker.RangePicker format="YYYY-MM-DD" />
          </Row>
          <Row>
            <TimePicker.RangePicker format="HH:mm" />
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row>
            <ContainedButton text="Apply" onClick={onFilterChange} />
          </Row>
        </DropdownContainer>
      );
    } else {
      return (
        <DropdownContainer>
          <Row>
            <SearchInput placeholder={"Location"} style={{ width: "40%" }} />
            <DropdownButton
              text="Type"
              width="fit-content"
              dropdownComponent={<></>}
            />
            <Group>
              <Button value="ONSITE">Onsite</Button>
              <Button value="ONLINE">Online</Button>
            </Group>
          </Row>
          <Row>
            <DatePicker.RangePicker format="YYYY-MM-DD" />
            <TimePicker.RangePicker format="HH:mm" />
          </Row>
          <Divider style={{ margin: 0 }} />
          <RightAlignedRow>
            <ContainedButton text="Apply" onClick={onFilterChange} />
          </RightAlignedRow>
        </DropdownContainer>
      );
    }
  };

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
        <SearchFilterContainer>
          <SearchInput
            placeholder={"Search event by name..."}
            onEnter={onEnter}
            style={{ width: "70%" }}
          />
          <DropdownButton
            text="Filter"
            width="30%"
            dropdownComponent={renderDropdownContent()}
          />
        </SearchFilterContainer>
      </HeaderContainer>
      {events && events.length > 0 ? (
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

const SearchFilterContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5vw;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding: 8px;
  gap: 5px;
  background-color: white;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  justify-content: space-between;
`;

const CenteredRow = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  justify-content: space-around;
`;

const RightAlignedRow = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  justify-content: flex-end;
`;

export default Event;

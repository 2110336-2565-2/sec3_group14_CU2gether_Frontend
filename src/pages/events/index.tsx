import { SearchInput } from "@/common/input";
import EventCard from "@/components/event-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  DatePicker,
  Divider,
  Empty,
  MenuProps,
  Radio,
  Select,
  Skeleton,
  Space,
  TimePicker,
  Typography,
} from "antd";
import { ContainedButton } from "@/common/button";
import useEventStore from "@/hooks/useEventStore";
import { Event, EventType, MeetingType } from "@/types";
import { DropdownButton } from "@/common/dropdown";
import { useMediaQuery } from "react-responsive";
import { getEventsRequestParams } from "api/events";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

type EventProps = {};

const { Title } = Typography;
const { Meta } = Card;
const { Image } = Skeleton;
const { Group, Button } = Radio;

const Event: React.FC<EventProps> = () => {
  const [eventsParams, setEventsParams] = useState<getEventsRequestParams>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { events, fetchEvents } = useEventStore();
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

  const onEnter = (e: any) => {
    const newEventsParams = { ...eventsParams, searchKey: e.target.value };
    setEventsParams(newEventsParams);
    fetchEvents(newEventsParams);
  };

  const onFilter = () => {
    fetchEvents(eventsParams);
  };

  const renderEventCardList = () =>
    events.map((event: Event, idx: number) => (
      <EventCard key={`event-${idx}`} event={event} />
    ));

  const eventTypeItems = Object.keys(EventType)
    .filter((type) => isNaN(+type))
    .map((type) => ({
      label: type.charAt(0) + type.slice(1).toLowerCase(),
      value: type,
    }));

  const renderLocationSearch = () => (
    <SearchInput
      placeholder={"Location"}
      style={{ minWidth: "150px", width: "35%" }}
    />
  );
  const renderEventTypePicker = () => (
    <Select
      placeholder={"Event Type"}
      allowClear
      value={eventsParams.eventType}
      onSelect={(value) =>
        setEventsParams({ ...eventsParams, eventType: value })
      }
      onClear={() => setEventsParams({ ...eventsParams, eventType: undefined })}
      options={eventTypeItems}
      style={{ minWidth: "125px", width: "30%" }}
    />
  );
  const renderMeetingTypePicker = () => (
    <Group
      value={eventsParams.meetingType}
      onChange={(e) => {
        setEventsParams({
          ...eventsParams,
          meetingType: e.target.value as MeetingType,
        });
      }}
    >
      <Button value="ONSITE">Onsite</Button>
      <Button value="ONLINE">Online</Button>
    </Group>
  );
  const renderDatePicker = () => (
    <DatePicker.RangePicker
      value={[
        eventsParams.startDate
          ? dayjs(eventsParams.startDate, "YYYY-MM-DD")
          : null,
        eventsParams.endDate ? dayjs(eventsParams.endDate, "YYYY-MM-DD") : null,
      ]}
      onChange={(
        value: RangePickerProps["value"],
        dateString: [string, string] | string
      ) => {
        setEventsParams({
          ...eventsParams,
          startDate: dateString[0],
          endDate: dateString[1],
        });
      }}
      format="YYYY-MM-DD"
    />
  );
  const renderTimePicker = () => (
    <TimePicker.RangePicker
      value={[
        eventsParams.startTime ? dayjs(eventsParams.startTime, "HH:mm") : null,
        eventsParams.endTime ? dayjs(eventsParams.endTime, "HH:mm") : null,
      ]}
      onChange={(
        value: RangePickerProps["value"],
        timeString: [string, string]
      ) => {
        setEventsParams({
          ...eventsParams,
          startTime: timeString[0],
          endTime: timeString[1],
        });
      }}
      format="HH:mm"
    />
  );

  const renderDropdownContent = () => {
    if (isMobileScreen) {
      return (
        <DropdownContainer>
          <Row>
            {renderLocationSearch()}
            {renderEventTypePicker()}
          </Row>
          <Row>{renderMeetingTypePicker()}</Row>
          <Row>{renderDatePicker()}</Row>
          <Row>{renderTimePicker()}</Row>
          <Divider style={{ margin: 0 }} />
          <Row>
            <ContainedButton text="Apply" onClick={onFilter} />
          </Row>
        </DropdownContainer>
      );
    } else {
      return (
        <DropdownContainer>
          <Row>
            {renderLocationSearch()}
            {renderEventTypePicker()}
            {renderMeetingTypePicker()}
          </Row>
          <Row>
            {renderDatePicker()}
            {renderTimePicker()}
          </Row>
          <Divider style={{ margin: 0 }} />
          <RightAlignedRow>
            <ContainedButton text="Apply" onClick={onFilter} />
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
            dropdownRender={renderDropdownContent}
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
  width: fit-content;
  padding: 8px;
  gap: 5px;
  background-color: white;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  padding: 0 5px;
  justify-content: space-between;
`;

const RightAlignedRow = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  justify-content: flex-end;
`;

export default Event;

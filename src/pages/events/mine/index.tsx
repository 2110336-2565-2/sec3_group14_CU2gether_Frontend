import EventCard from "@/components/event-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Empty, Skeleton, Space, Typography } from "antd";
import { ContainedButton } from "@/common/button";
import { Event } from "@/types";
import Link from "next/link";
import userProfile from "api/user-profile";

type JoinEventProps = {};

const { Title } = Typography;
const { Meta } = Card;
const { Image } = Skeleton;

const JoinEvent: React.FC<JoinEventProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [myEventsFinished, setMyEventsFinished] = useState<Event[]>([]);

  useEffect(() => {
    const fetchMyEvents = () => {
      userProfile.getMyEvents().then((res: any) => setMyEvents(res));
    };
    const fetchMyEventsFinished = () => {
      userProfile
        .getMyEventsFinished()
        .then((res: any) => setMyEventsFinished(res));
    };
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchMyEvents();
        await fetchMyEventsFinished();
      } catch (e) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderEventCardList = (events: Event[]) =>
    events.map((event: Event, idx: number) => (
      <Link href={`./${event.id}/detail`}>
        <EventCard key={`event-${idx}`} event={event} />
      </Link>
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
        <Title>My Events</Title>
      </HeaderContainer>
      <ButtonContainer>
        <Link href={`./create`}>
          <ContainedButton text="Create New Event" />
        </Link>
      </ButtonContainer>
      <div>
        <Title level={3}>Upcoming events</Title>
        {myEvents && myEvents.length > 0 ? (
          <DetailContainer>{renderEventCardList(myEvents)}</DetailContainer>
        ) : (
          <EmptyWrapper>
            <Empty description={"No event"} />
          </EmptyWrapper>
        )}
      </div>
      <div>
        <Title level={3}>Past events</Title>
        {myEventsFinished && myEventsFinished.length > 0 ? (
          <DetailContainer>
            {renderEventCardList(myEventsFinished)}
          </DetailContainer>
        ) : (
          <EmptyWrapper>
            <Empty description={"No event"} />
          </EmptyWrapper>
        )}
      </div>
    </EventContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

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
  padding-bottom: 5vh;
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
  justify-content: space-between;
`;

const RightAlignedRow = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  justify-content: flex-end;
`;

export default JoinEvent;

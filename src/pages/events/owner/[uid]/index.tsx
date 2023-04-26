import EventCard from "@/components/event-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Empty, Skeleton, Space, Typography } from "antd";
import { ContainedButton } from "@/common/button";
import { Event } from "@/types";
import Link from "next/link";
import userProfile from "@/pages/api/user-profile";
import { useRouter } from "next/router";

type UserEventsProps = {};

const { Title } = Typography;
const { Meta } = Card;
const { Image } = Skeleton;

const UserEvents: React.FC<UserEventsProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsFinished, setEventsFinished] = useState<Event[]>([]);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    const fetchMyEvents = () => {
      userProfile
        .getEventsByOwner(uid as string)
        .then((res: any) => setEvents(res));
    };
    const fetchMyEventsFinished = () => {
      userProfile
        .getMyEventsFinished()
        .then((res: any) => setEventsFinished(res));
    };
    const setUserName = (uid: string) => {
      userProfile.checkStatusById(uid).then((res: any) => setName(res.name));
    };
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchMyEvents();
        await fetchMyEventsFinished();
        await setUserName(uid as string);
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
        <Title>{name}'s Events</Title>
      </HeaderContainer>
      <div>
        <Title level={3}>Upcoming events</Title>
        {events && events.length > 0 ? (
          <DetailContainer>{renderEventCardList(events)}</DetailContainer>
        ) : (
          <EmptyWrapper>
            <Empty description={"No event"} />
          </EmptyWrapper>
        )}
      </div>
      <div>
        <Title level={3}>Past events</Title>
        {eventsFinished && eventsFinished.length > 0 ? (
          <DetailContainer>
            {renderEventCardList(eventsFinished)}
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

export default UserEvents;

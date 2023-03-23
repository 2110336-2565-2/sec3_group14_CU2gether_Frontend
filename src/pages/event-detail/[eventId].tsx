import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography, Layout } from "antd";
import { useRouter } from "next/router";
import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import eventDetail from "api/event-detail";
import { Event, EventType, MeetingType, Visibility } from "@/types";
import useEventStore from "@/hooks/useEventStore";

const { Title } = Typography;

const EventDetail: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const [event, setEvent] = useState<Event>({
    id: 0,
    eventName: "",
    eventType: EventType.CONCERT,
    visibility: Visibility.PUBLIC,
    tags: [],
    requireParticipantsMin: 1,
    requireParticipantsMax: 10,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    meetingType: MeetingType.ONSITE,
    location: "",
    website: "",
    description: "",
    pictures: [],
    ownerName: "",
  });

  const { joinedEvents, fetchJoinEvents } = useEventStore();
  const [join, setJoin] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (eventId) {
        try {
          setEvent(await eventDetail.getEventById(eventId.toString()));
          await fetchJoinEvents();
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    joinedEvents.map((event: Event, idx: number) => {
      if (event.id.toString() == eventId) {
        setJoin(true);
      }
    });
  }, [eventId, joinedEvents]);

  const {
    eventName,
    ownerName,
    eventType,
    location,
    startDate,
    endDate,
    startTime,
    endTime,
    pictures,
    description,
  } = event;

  const JoinOrUnjoin = () => {
    if (eventId) {
      if (join) {
        eventDetail.unjoinEvent(eventId.toString());
        setJoin(false);
      } else {
        eventDetail.joinEvent(eventId.toString());
        setJoin(true);
      }
    }
  };

  const LayoutFooter = (
    <Space align="end">
      <OutlinedButton text="Description" />
      <ContainedButton text={join ? "Unjoin" : "Join"} onClick={JoinOrUnjoin} />
    </Space>
  );

  const DescriptionFooter = (
    <Space align="end">
      <OutlinedButton text="Back To Top" />
      <ContainedButton
        text={join ? "Unjoin Event" : "Join Event"}
        onClick={JoinOrUnjoin}
      />
    </Space>
  );

  const EventDetailContainer = styled.div`
    padding: 8rem 0;
    height: 50rem;

    position: relative;
    z-index: 1;
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${pictures[0]});
      background-size: cover;
      background-position: center;
      filter: blur(10px);
      z-index: -1;
    }
  `;

  return (
    <EventDetailPageContainer id="event-detail">
      <EventDetailContainer>
        <LayoutContainer>
          <Sider>
            <Image src={pictures[0]} alt={eventName} layout="fill" />
          </Sider>
          <RightLayout>
            <Header>
              <Title style={StyleTitle} level={1}>
                <b>{eventName}</b>
              </Title>
              <span>Created by {ownerName}</span>
            </Header>
            <Content>
              <Space size={"middle"}>
                {EventTypeImg}
                {eventType}
              </Space>
              <Space size={"middle"}>
                {LocateImg}
                {location}
              </Space>
              <Space size={"middle"}>
                {CalendarImg}
                {startDate ? dayjs(startDate).format("ddd, DD MMM YYYY") : ""}-
                {endDate ? dayjs(endDate).format("ddd, DD MMM YYYY") : ""},{" "}
                {startTime}-{endTime}
              </Space>
            </Content>
            <Footer>{LayoutFooter}</Footer>
          </RightLayout>
        </LayoutContainer>
      </EventDetailContainer>
      <DescriptionContainer>
        <Description>{description}</Description>
        <DescriptionFooterContainer>
          {DescriptionFooter}
        </DescriptionFooterContainer>
      </DescriptionContainer>
    </EventDetailPageContainer>
  );
};

const DescriptionContainer = styled.div`
  padding: 3rem;
  width: 80%;
  height: 500px;
  margin: 0 auto;
`;

const Description = styled.div`
  height: 300px;
  margin: 1rem;
  text-align: left;
`;

const DescriptionFooterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LayoutContainer = styled.div`
  display: flex;
  width: 60vw;
  height: 100%;
  margin: 0 auto;
  ${theme.media.tablet} {
    flex-direction: column;
    align-items: center;
    width: 85%;
  }
  ${theme.media.mobile} {
    width: 100%;
  }
`;

const RightLayout = styled.div`
  width: 65%;
  height: 100%;
  margin: 0 auto;
  font-size: 1rem;
  ${theme.media.tablet} {
    height: 60%;
    width: 100%;
  }
`;

const StyleTitle = {
  color: "#fff",
  marginBottom: "0rem",
  fontSize: "2rem",
};

const Header = styled.div`
  text-align: left;
  color: #fff;
  height: 30%;
  width: 100%;
  background-color: rgb(0, 0, 0, 80%);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  ${theme.media.tablet} {
    padding: 1rem 2.5rem;
    gap: 0.5rem;
  }
`;

const Content = styled.div`
  text-align: left;
  color: #fff;
  background-color: rgb(0, 0, 0, 80%);
  padding: 1.5rem 4rem;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${theme.media.tablet} {
    padding: 1.5rem 2.5rem;
  }
`;

const Sider = styled.div`
  background-color: rgb(0, 0, 0, 80%);
  color: #fff;
  width: 35%;
  height: 100%;
  text-align: center;
  position: relative;
  ${theme.media.tablet} {
    width: 100%;
  }
`;

const Footer = styled.div`
  text-align: center;
  color: #fff;
  background-color: rgb(0, 0, 0, 80%);
  font-weight: bold;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventDetailPageContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const EventTypeImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.25 7.83333V5H24.5L22.75 2.51667L24.5 0H15.75V7.83333L0 18.3333V35H12.25V26.6667L17.5525 23.3333L22.75 26.6667V35H35V18.3333L19.25 7.83333Z"
      fill="white"
    />
  </svg>
);

const LocateImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 28 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 17.5C14.9625 17.5 15.7867 17.157 16.4727 16.471C17.1588 15.785 17.5012 14.9613 17.5 14C17.5 13.0375 17.157 12.2133 16.471 11.5273C15.785 10.8413 14.9613 10.4988 14 10.5C13.0375 10.5 12.2133 10.843 11.5273 11.529C10.8413 12.215 10.4988 13.0387 10.5 14C10.5 14.9625 10.843 15.7867 11.529 16.4727C12.215 17.1588 13.0387 17.5012 14 17.5ZM14 35C9.30417 31.0042 5.79717 27.293 3.479 23.8665C1.16083 20.44 0.00116667 17.2678 0 14.35C0 9.975 1.40758 6.48958 4.22275 3.89375C7.03792 1.29792 10.297 0 14 0C17.7042 0 20.9638 1.29792 23.779 3.89375C26.5942 6.48958 28.0012 9.975 28 14.35C28 17.2667 26.8403 20.4388 24.521 23.8665C22.2017 27.2942 18.6947 31.0053 14 35Z"
      fill="white"
    />
  </svg>
);

const CalendarImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 32 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 21C15.4963 21 15.0738 20.832 14.7324 20.496C14.3911 20.16 14.221 19.7447 14.2222 19.25C14.2222 18.7542 14.3929 18.3382 14.7342 18.0022C15.0756 17.6662 15.4975 17.4988 16 17.5C16.5037 17.5 16.9262 17.668 17.2676 18.004C17.6089 18.34 17.779 18.7553 17.7778 19.25C17.7778 19.7458 17.6071 20.1617 17.2658 20.4977C16.9244 20.8337 16.5025 21.0012 16 21ZM8.88889 21C8.38519 21 7.96267 20.832 7.62134 20.496C7.28 20.16 7.10993 19.7447 7.11111 19.25C7.11111 18.7542 7.28178 18.3382 7.62311 18.0022C7.96445 17.6662 8.38637 17.4988 8.88889 17.5C9.39259 17.5 9.81511 17.668 10.1564 18.004C10.4978 18.34 10.6679 18.7553 10.6667 19.25C10.6667 19.7458 10.496 20.1617 10.1547 20.4977C9.81333 20.8337 9.39141 21.0012 8.88889 21ZM23.1111 21C22.6074 21 22.1849 20.832 21.8436 20.496C21.5022 20.16 21.3321 19.7447 21.3333 19.25C21.3333 18.7542 21.504 18.3382 21.8453 18.0022C22.1867 17.6662 22.6086 17.4988 23.1111 17.5C23.6148 17.5 24.0373 17.668 24.3787 18.004C24.72 18.34 24.8901 18.7553 24.8889 19.25C24.8889 19.7458 24.7182 20.1617 24.3769 20.4977C24.0356 20.8337 23.6136 21.0012 23.1111 21ZM16 28C15.4963 28 15.0738 27.832 14.7324 27.496C14.3911 27.16 14.221 26.7447 14.2222 26.25C14.2222 25.7542 14.3929 25.3382 14.7342 25.0022C15.0756 24.6663 15.4975 24.4988 16 24.5C16.5037 24.5 16.9262 24.668 17.2676 25.004C17.6089 25.34 17.779 25.7553 17.7778 26.25C17.7778 26.7458 17.6071 27.1617 17.2658 27.4977C16.9244 27.8337 16.5025 28.0012 16 28ZM8.88889 28C8.38519 28 7.96267 27.832 7.62134 27.496C7.28 27.16 7.10993 26.7447 7.11111 26.25C7.11111 25.7542 7.28178 25.3382 7.62311 25.0022C7.96445 24.6663 8.38637 24.4988 8.88889 24.5C9.39259 24.5 9.81511 24.668 10.1564 25.004C10.4978 25.34 10.6679 25.7553 10.6667 26.25C10.6667 26.7458 10.496 27.1617 10.1547 27.4977C9.81333 27.8337 9.39141 28.0012 8.88889 28ZM23.1111 28C22.6074 28 22.1849 27.832 21.8436 27.496C21.5022 27.16 21.3321 26.7447 21.3333 26.25C21.3333 25.7542 21.504 25.3382 21.8453 25.0022C22.1867 24.6663 22.6086 24.4988 23.1111 24.5C23.6148 24.5 24.0373 24.668 24.3787 25.004C24.72 25.34 24.8901 25.7553 24.8889 26.25C24.8889 26.7458 24.7182 27.1617 24.3769 27.4977C24.0356 27.8337 23.6136 28.0012 23.1111 28ZM3.55556 35C2.57778 35 1.74045 34.657 1.04356 33.971C0.346669 33.285 -0.00118217 32.4613 3.0183e-06 31.5V7C3.0183e-06 6.0375 0.348447 5.21325 1.04534 4.52725C1.74222 3.84125 2.57897 3.49883 3.55556 3.5H5.33334V0H8.88889V3.5H23.1111V0H26.6667V3.5H28.4444C29.4222 3.5 30.2596 3.843 30.9564 4.529C31.6533 5.215 32.0012 6.03867 32 7V31.5C32 32.4625 31.6516 33.2867 30.9547 33.9727C30.2578 34.6587 29.421 35.0012 28.4444 35H3.55556ZM3.55556 31.5H28.4444V14H3.55556V31.5Z"
      fill="white"
    />
  </svg>
);

export default EventDetail;

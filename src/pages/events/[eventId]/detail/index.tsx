import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography, Layout } from "antd";
import { useRouter } from "next/router";
import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import events from "api/events";
import { Event, EventType, MeetingType, Visibility } from "@/types";
import useEventStore from "@/hooks/useEventStore";
import FestivalIcon from "@mui/icons-material/Festival";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CU_API } from "@/config";

const { Title } = Typography;

const EventDetail: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const { event, setEvent, joinedEvents, fetchJoinEvents } = useEventStore();
  const [join, setJoin] = useState<boolean>(false);
  const descriptionRef = useRef<null | HTMLDivElement>(null);
  const eventDetailRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (eventId) {
        try {
          setEvent(await events.getEventById(eventId.toString()));
          await fetchJoinEvents({});
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [eventId]);

  useEffect(() => {
    joinedEvents.forEach((event: Event) => {
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
        events.unjoinEvent(eventId.toString());
        setJoin(false);
      } else {
        events.joinEvent(eventId.toString());
        setJoin(true);
      }
    }
  };

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const scrollToEventDetail = () => {
    eventDetailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const LayoutFooter = (
    <Space align="end">
      <OutlinedButton text="Description" onClick={scrollToDescription} />
      <ContainedButton text={join ? "Unjoin" : "Join"} onClick={JoinOrUnjoin} />
    </Space>
  );

  const DescriptionFooter = (
    <Space align="end">
      <OutlinedButton text="Back To Top" onClick={scrollToEventDetail} />
      <ContainedButton
        text={join ? "Unjoin Event" : "Join Event"}
        onClick={JoinOrUnjoin}
      />
    </Space>
  );

  const EventDetailContainer = styled.div`
    padding: 8rem 0;
    height: 93vh;
    position: relative;
    z-index: 1;
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${CU_API + pictures[0].slice(2)});
      background-size: cover;
      background-position: center;
      filter: blur(10px);
      z-index: -1;
    }
    ${theme.media.tablet} {
      padding: 2rem 0;
    }
  `;

  return (
    <EventDetailPageContainer>
      <div ref={eventDetailRef} />
      <EventDetailContainer>
        <LayoutContainer>
          <Sider>
            <img
              src={CU_API + pictures[0].slice(2)}
              alt={"Event Image"}
              style={{ height: "100%", width: "100%" }}
              crossOrigin="anonymous"
            />
          </Sider>
          <RightLayout>
            <Header>
              <Title style={StyleTitle} level={1}>
                {eventName}
              </Title>
              <div>Created by {ownerName}</div>
            </Header>
            <Content>
              <Space size={"middle"}>
                <FestivalIcon />
                {eventType}
              </Space>
              <Space size={"middle"}>
                <LocationOnIcon />
                {location}
              </Space>
              <Space size={"middle"}>
                <CalendarMonthIcon />
                <div>
                  {startDate ? dayjs(startDate).format("ddd, DD MMM YYYY") : ""}
                  {" - "}
                  {endDate
                    ? dayjs(endDate).format("ddd, DD MMM YYYY")
                    : ""} , {startTime}
                  {" - "}
                  {endTime}
                </div>
              </Space>
            </Content>
            <Footer>{LayoutFooter}</Footer>
          </RightLayout>
        </LayoutContainer>
      </EventDetailContainer>
      <div ref={descriptionRef} />
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
  width: 100%;
  margin: 0 auto;
  padding: 3rem 0;
  height: 93vh;
`;

const Description = styled.div`
  height: 90%;
  margin: 1rem auto;
  width: 80%;
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
    height: 50%;
    width: 100%;
  }
`;

const StyleTitle = {
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
};

const Header = styled.div`
  height: 200px;
  text-align: left;
  color: #fff;
  height: 40%;
  width: 100%;
  background-color: rgb(0, 0, 0, 80%);
  padding: 2rem 4rem;
  padding-top: 3rem;
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
    padding: 0rem 2.5rem;
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
    height: 50%;
  }
`;

const Footer = styled.div`
  text-align: center;
  color: #fff;
  background-color: rgb(0, 0, 0, 80%);
  font-weight: bold;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventDetailPageContainer = styled.div`
  padding: 0;
  margin: 0;
`;

export default EventDetail;

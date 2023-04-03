import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography, Layout } from "antd";
import { useRouter } from "next/router";
import { ContainedButton, OutlinedButton } from "@/common/button";
import theme from "@/utils/theme";
import events from "api/events";
import { Event, EventType, MeetingType, ROLE, Visibility } from "@/types";
import FestivalIcon from "@mui/icons-material/Festival";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CU_API } from "@/config";
import useProfileStore from "@/hooks/useProfileStore";
import Link from "next/link";
import Image from "next/legacy/image";
import { getEventsRequestParams } from "api/events";
import userProfile from "api/user-profile";
import { finished } from "stream";

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
    pictures: [""],
    ownerName: "",
  });
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [join, setJoin] = useState<boolean>(false);
  const descriptionRef = useRef<null | HTMLDivElement>(null);
  const eventDetailRef = useRef<null | HTMLDivElement>(null);
  const { id, role, checkStatus } = useProfileStore();

  useEffect(() => {
    const checkLoginStatus = async () => {
      await checkStatus();
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchJoinEvents = (params: getEventsRequestParams) => {
      userProfile
        .getJoinedEvents(params)
        .then((res: any) => setJoinedEvents(res));
    };
    const fetchData = async () => {
      if (eventId) {
        try {
          setEvent(await events.getEventByID(eventId.toString()));
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
    ownerId,
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

  const finished = true;

  const LayoutFooter = () => {
    if (finished) {
      return (
        <Space align="end">
          <OutlinedButton text="Description" onClick={scrollToDescription} />
          <Link href={`../${event!.id}/review`}>
            <OutlinedButton text="Reviews" />
          </Link>
        </Space>
      );
    }
    if (ownerId == id) {
      return (
        <Space align="end">
          <OutlinedButton text="Description" onClick={scrollToDescription} />
          <Link href={`../${event!.id}/edit-main`}>
            <OutlinedButton text="Edit Event Detail" />
          </Link>
        </Space>
      );
    } else {
      switch (role) {
        case ROLE.STUDENT:
          return (
            <Space align="end">
              <OutlinedButton
                text="Description"
                onClick={scrollToDescription}
              />
              <ContainedButton
                text={join ? "Unjoin" : "Join"}
                onClick={JoinOrUnjoin}
              />
            </Space>
          );
        case ROLE.ORGANIZER:
          return (
            <Space align="end">
              <OutlinedButton
                text="Description"
                onClick={scrollToDescription}
              />
            </Space>
          );
      }
    }
  };

  const DescriptionFooter = () => {
    if (finished) {
      return (
        <Space align="end">
          <OutlinedButton text="Back To Top" onClick={scrollToEventDetail} />
          <Link href={`../${event!.id}/review`}>
            <OutlinedButton text="Reviews" />
          </Link>
        </Space>
      );
    }
    if (ownerId == id) {
      return (
        <Space align="end">
          <OutlinedButton text="Back To Top" onClick={scrollToEventDetail} />
          <Link href={`../${event.id}/edit-main`}>
            <OutlinedButton text="Edit Event Detail" />
          </Link>
        </Space>
      );
    } else {
      switch (role) {
        case ROLE.STUDENT:
          return (
            <Space align="end">
              <OutlinedButton
                text="Back To Top"
                onClick={scrollToEventDetail}
              />
              <ContainedButton
                text={join ? "Unjoin Event" : "Join Event"}
                onClick={JoinOrUnjoin}
              />
            </Space>
          );
        case ROLE.ORGANIZER:
          return (
            <Space align="end">
              <OutlinedButton
                text="Back To Top"
                onClick={scrollToEventDetail}
              />
            </Space>
          );
      }
    }
  };

  return (
    <EventDetailPageContainer>
      <div ref={eventDetailRef} />

      <EventDetailContainer>
        <LayoutContainer>
          <Sider>
            <Image
              src={CU_API + pictures[pictures.length - 1]}
              alt={"Event Image"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              crossOrigin="anonymous"
              loader={() => CU_API + pictures[pictures.length - 1]}
            />
          </Sider>
          <RightLayout>
            <Header>
              <Title style={StyleTitle} level={1}>
                {eventName}
              </Title>
              <Typography style={{ color: "white" }}>
                Created by {ownerName}
              </Typography>
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
                <Typography style={{ color: "white" }}>
                  {startDate ? dayjs(startDate).format("ddd, DD MMM YYYY") : ""}
                  {" - "}
                  {endDate
                    ? dayjs(endDate).format("ddd, DD MMM YYYY")
                    : ""} , {startTime}
                  {" - "}
                  {endTime}
                </Typography>
              </Space>
            </Content>
            <Footer>{LayoutFooter()}</Footer>
          </RightLayout>
        </LayoutContainer>
        <BlurBackgroundImg
          src={CU_API + pictures[pictures.length - 1]}
          alt={"Event Image"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          crossOrigin="anonymous"
          loader={() => CU_API + pictures[pictures.length - 1]}
        />
      </EventDetailContainer>
      <div ref={descriptionRef} />
      <DescriptionContainer>
        <Description>{description}</Description>
        <DescriptionFooterContainer>
          {DescriptionFooter()}
        </DescriptionFooterContainer>
      </DescriptionContainer>
    </EventDetailPageContainer>
  );
};

const BlurBackgroundImg = styled(Image)`
  filter: blur(5px);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const EventDetailContainer = styled.div`
  position: relative;
  padding: 8rem 0;
  height: 93vh;
  ${theme.media.tablet} {
    padding: 2rem 0;
  }
`;

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
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 60vw;
  height: 70%;
  margin: 0 auto;
  background-color: rgb(0, 0, 0, 80%);
  ${theme.media.tablet} {
    flex-direction: column;
    align-items: center;
    width: 85%;
  }
  ${theme.media.mobile} {
    width: 90%;
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
  color: theme.color.white,
  fontSize: "2rem",
  fontWeight: "bold",
};

const Header = styled.div`
  height: 200px;
  text-align: left;
  color: #fff;
  height: 40%;
  width: 100%;
  padding: 3rem 4rem 2rem;
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

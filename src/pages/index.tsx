import Image from "next/image";
import { useEffect, useRef } from "react";
import { Carousel, notification, Typography } from "antd";
import styled from "styled-components";
import React from "react";
import { ContainedButton } from "@/common/button";
import useEventStore from "@/hooks/useEventStore";

import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { getImageURL } from "@/utils";
import { useRouter } from "next/router";
import useProfileStore from "@/hooks/useProfileStore";

const { Title, Paragraph } = Typography;

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const createEventSectionRef: React.Ref<any> = useRef(null);
  const [events, fetchEvents] = useEventStore((state) => [
    state.events,
    state.fetchEvents,
  ]);
  const router = useRouter();
  const role = useProfileStore((state) => state.role);

  useEffect(() => {
    fetchEvents({});
  }, []);

  const redirectToEvent = (eventId: number) => {
    if (role) {
      router.push(`/events/${eventId}`);
    } else {
      notification.open({ message: "Please login first." });
    }
  };

  const scrollToBottom = () => {
    createEventSectionRef && createEventSectionRef.current
      ? createEventSectionRef.current.scrollIntoView({ behavior: "smooth" })
      : null;
  };

  const handleClickCreateEvent = () => {
    if (role) {
      router.push(`/events/create`);
    } else {
      notification.open({ message: "Please login first." });
    }
  };

  return (
    <>
      <MainSection>
        <BackgroundImage
          src={"./background.svg"}
          alt={"background image"}
          loader={() => "./background.svg"}
          crossOrigin="anonymous"
          fill
        />
        <HomeContentContainer>
          <HomePageTitle>Want to join events?</HomePageTitle>
          <EventCarousel autoplay>
            {events &&
              events.slice(0, 5).map((event, i) => {
                return (
                  <EventImageContainer
                    onClick={() => redirectToEvent(event.id)}
                  >
                    <EventImage
                      src={getImageURL(event.pictures[0])}
                      alt={`${event.eventName} image`}
                      loader={() => getImageURL(event.pictures[0])}
                      crossOrigin="anonymous"
                      fill
                    />
                  </EventImageContainer>
                );
              })}
          </EventCarousel>
          <DownArrowIconWrapper>
            <ArrowDropDownCircleOutlinedIcon
              sx={{ fontSize: 100 }}
              onClick={() => scrollToBottom()}
            />
          </DownArrowIconWrapper>
        </HomeContentContainer>
      </MainSection>
      <CreateEventSection ref={createEventSectionRef}>
        <CreateEventSubSection>
          <CreateEventTitle level={2}>Let's make some noise!</CreateEventTitle>
          <CreateEventDescription>
            You can create your own events <br></br> which will appear on this
            website to find participants.
          </CreateEventDescription>
          <ContainedButton
            text={"Create Event"}
            onClick={handleClickCreateEvent}
          />
        </CreateEventSubSection>
        <CreateEventSubSection>
          <ExampleEventImage
            src={"./example_events.svg"}
            alt={"example events"}
            loader={() => "./example_events.svg"}
            crossOrigin="anonymous"
            fill
            sizes="10vw"
          />
        </CreateEventSubSection>
      </CreateEventSection>
    </>
  );
};

const MainSection = styled.div`
  position: relative;
  height: 100%;
`;

const BackgroundImage = styled(Image)`
  object-fit: cover;
  z-index: 0;
`;

const HomeContentContainer = styled.div`
  top: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 90%;
`;

const HomePageTitle = styled(Title)`
  color: white !important;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const EventCarousel = styled(Carousel)`
  height: 400px;
  width: 600px;
  filter: drop-shadow(0 0 0.75rem black);
  z-index: 1;
`;

const EventImageContainer = styled.div`
  position: relative;
  min-height: 400px !important;
  min-width: 599px !important;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

const EventImage = styled(Image)`
  object-fit: contain;
  // width: 100%;
  margin: auto;
`;

const DownArrowIconWrapper = styled.div`
  color: white;
  width: 100px;
  opacity: 0.8;
  cursor: pointer;
`;

const CreateEventSection = styled.div`
  position: relative;
  height: 100%;
`;

const CreateEventSubSection = styled.div`
  position: relative;
  float: left;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreateEventTitle = styled(Title)``;

const CreateEventDescription = styled(Paragraph)`
  font-size: 24px;
  text-align: center;
`;

const ExampleEventImage = styled(Image)`
  padding: 5%;
`;

export default Home;

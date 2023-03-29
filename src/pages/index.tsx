import { Inter } from "@next/font/google";
import Image from "next/image";
import { use, useRef } from "react";
import { Carousel, Typography } from "antd";
import styled from "styled-components";
import React from "react";
import { ContainedButton } from "@/common/button";

import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

import LoginAndRegistration from "@/components/login-registration/LoginAndRegistrationModal";

const inter = Inter({ subsets: ["latin"] });

const { Title, Paragraph } = Typography;

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const createEventSectionRef: React.Ref<any> = useRef(null);

  const scrollToBottom = () => {
    createEventSectionRef && createEventSectionRef.current
      ? createEventSectionRef.current.scrollIntoView({ behavior: "smooth" })
      : null;
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
        <HomePageTitle>Want Events?</HomePageTitle>
        <EventCarousel autoplay>
          <EventImageContainer>
            <EventImage
              src={`./event1.svg`}
              alt={`event image 1`}
              loader={() => `./event1.svg`}
              crossOrigin="anonymous"
              fill
            />
          </EventImageContainer>
          <EventImageContainer>
            <EventImage
              src={`./event2.svg`}
              alt={`event image 2`}
              loader={() => `./event2.svg`}
              crossOrigin="anonymous"
              fill
            />
          </EventImageContainer>
          <EventImageContainer>
            <EventImage
              src={`./event3.svg`}
              alt={`event image 3`}
              loader={() => `./event3.svg`}
              crossOrigin="anonymous"
              fill
            />
          </EventImageContainer>
          <EventImageContainer>
            <EventImage
              src={`./event4.svg`}
              alt={`event image 4`}
              loader={() => `./event4.svg`}
              crossOrigin="anonymous"
              fill
            />
          </EventImageContainer>
          <EventImageContainer>
            <EventImage
              src={`./event5.svg`}
              alt={`event image 5`}
              loader={() => `./event5.svg`}
              crossOrigin="anonymous"
              fill
            />
          </EventImageContainer>
        </EventCarousel>
        <DownArrowIconWrapper>
          <ArrowDropDownCircleOutlinedIcon
            sx={{ fontSize: 100 }}
            onClick={() => scrollToBottom()}
          />
        </DownArrowIconWrapper>
      </MainSection>
      <CreateEventSection ref={createEventSectionRef}>
        <CreateEventSubSection>
          <CreateEventTitle level={2}>Let's make some noise!</CreateEventTitle>
          <CreateEventDescription>
            You can create your own events <br></br> which will appear on this
            website to find participants.
          </CreateEventDescription>
          <ContainedButton text={"Create Event"} big />
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

const HomePageTitle = styled(Title)`
  color: white !important;
  top: 80px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const EventCarousel = styled(Carousel)`
  top: 100px;
  margin: auto;
  max-height: 400px;
  max-width: 600px;
  filter: drop-shadow(0 0 0.75rem black);
  z-index: 1;
`;

const EventImageContainer = styled.div`
  position: relative;
  height: 400px !important;
  width: 599px !important;
  margin: 0;
`;

const EventImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  margin: auto;
`;

const DownArrowIconWrapper = styled.div`
  margin: auto;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  width: 100px;
  opacity: 0.8;
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

// const CreateEventRightSubSection = styled.div`
//   float: left;
//   width: 50%;
//   height: 100%;
// `;

const ExampleEventImage = styled(Image)`
  padding: 5%;
`;

export default Home;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Skeleton, Typography } from "antd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FestivalIcon from "@mui/icons-material/Festival";
import { CU_API } from "@/config";
// import Image from "next/legacy/image";
import { Event, EventType, MeetingType, ROLE, Visibility } from "@/types";
import { events } from "@/pages/api";

import theme from "@/utils/theme";
import useEventStore from "@/hooks/useEventStore";
import { useRouter } from "next/router";
import useReviewStore from "@/hooks/useReviewStore";
import { ReviewsList } from "@/views/review";
import { ReviewForm } from "@/components/review-event";

const { Text, Title } = Typography;

const ReviewPage: React.FC<{}> = () => {
  const { reviewList, getReviews } = useReviewStore();
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

  const router = useRouter();
  const { query, isReady } = router;
  const { eventId } = query;

  useEffect(() => {
    if (eventId) {
      const getData = async (eventId: string) => {
        try {
          setEvent(await events.getEventByID(eventId.toString()));
          await getReviews(eventId);
        } catch (err) {
          console.log(err);
        }
      };
      getData(eventId.toString());
    }
  }, [eventId]);

  const { pictures } = event;

  if (!isReady) return <Skeleton></Skeleton>;

  return (
    <ContentsContainer>
      <Title>Review Event</Title>
      <EventContainer>
        <InsertPictureContainer>
          <Image
            src={CU_API + pictures[pictures.length - 1]}
            alt={"Event Image"}
            width={"50%"}
            crossOrigin="anonymous"
          />
        </InsertPictureContainer>
        <EventDetailSummary />
        <RateContainer>
          <ReviewsList
            reviewForm={<ReviewForm eventId={eventId as string} />}
            reviewList={reviewList}
          />
        </RateContainer>
      </EventContainer>
    </ContentsContainer>
  );
};

export default ReviewPage;

const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-row-start: 2;
  grid-column-start: 2;

  ${theme.media.tablet} {
    grid-column-start: 1;
    grid-column-end: span 2;
  }
`;

const EventContainer = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: 25% auto;
  column-gap: 30px;
  width: 80vw;
  height: 100vh;

  ${theme.media.tablet} {
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 30% auto;
  }

  ${theme.media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const InsertPictureContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  left: 40%;
  top: 10%;
  ${theme.media.tablet} {
    width: 100%;
    height: 50%;
  }
`;

const ContentsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2.5vh 5vw;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-start: 1;
  grid-column-start: 2;
`;

const HeaderText = styled(Text)`
  font-size: 2.25rem;

  ${theme.media.mobile} {
    font-size: 1.75rem;
  }
`;

const NormalText = styled(Text)`
  font-size: 1rem;

  ${theme.media.mobile} {
    font-size: 0.75rem;
  }
`;

const EventDetailSummary: React.FC<{}> = ({}) => {
  const { event, getEventDetail } = useEventStore();
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      const getData = async (id: string) => {
        try {
          await getEventDetail(id);
        } catch (err) {
          console.log(err);
        }
      };
      getData(eventId.toString());
    }
  }, [eventId]);

  return (
    <DetailsContainer>
      <HeaderText>{event?.eventName}</HeaderText>
      <NormalText>Created by {event?.ownerName}</NormalText>
      <div>
        <FestivalIcon />
        <NormalText>{event?.eventType}</NormalText>
      </div>
      <div>
        <LocationOnIcon />
        <NormalText>{event?.location}</NormalText>
      </div>
      <div>
        <CalendarMonthIcon />
        <NormalText>
          {event?.startTime}
          {" - "}
          {event?.endTime}
          {", "}
          {event?.startDate}
          {" - "}
          {event?.endDate}
        </NormalText>
      </div>
    </DetailsContainer>
  );
};

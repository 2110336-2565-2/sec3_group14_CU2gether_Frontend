import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Rate, Typography } from "antd";

import theme from "@/utils/theme";
import calendar_logo from "../../../../../asset/calendar_logo.svg";
import eventType_logo from "../../../../../asset/eventType_logo.svg";
import location_logo from "../../../../../asset/location_logo.svg";
import UserReview from "@/components/review-event/UserReview";
import { ContainedButton } from "@/common/button";
import { Event, EventType, Visibility, MeetingType } from "@/types";
import useEventStore from "@/hooks/useEventStore";
import { useRouter } from "next/router";
import useReviewStore from "@/hooks/useReviewStore";
import useProfileStore from "@/hooks/useProfileStore";
import { ReviewDetail } from "@/hooks/useReviewStore";
import { Review } from "@/types";

const { Text, Title } = Typography;
const { TextArea } = Input;

const mockedData = [
  {
    firstname: "mo",
    lastname: "dog",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    firstname: "ma",
    lastname: "cat",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    firstname: "mee",
    lastname: "bird",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    firstname: "mao",
    lastname: "kai",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
];

const ReviewPage: React.FC<{}> = () => {
  const { event, getEventDetail } = useEventStore();
  const { reviews, getReviews } = useReviewStore();
  
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      const getData = async (eventId: string) => {
        try {
          await getEventDetail(eventId);
          await getReviews(eventId);
        } catch (err) {
          console.log(err);
        }
      };
      getData(eventId.toString());
    }
  }, [eventId]);

  const renderReviewsList = () => 
    reviews.map((reviewDetail:ReviewDetail, idx: number) => (
      <UserReview key={`review-${idx}`} reviewDetail={reviewDetail} />
    ));  

  return (
    <ContentsContainer>
      <Title>Review Event</Title>
      <EventContainer>
        <InsertPicture />
        <EventDetailSummary />
        <RateContainer>
          <AverageScore averageScore={5} totalReviews={4} />
          <SubmitReview eventId={eventId?.toString()} />
          {renderReviewsList()}
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

const InsertPicture = styled.div`
  background-color: rgb(34, 211, 238);
  width: 100%;
  height: auto;
  grid-row-start: 1;
  grid-row-end: span 2;
  grid-column-start: 1;

  ${theme.media.tablet} {
    grid-row-end: 2;
  }

  ${theme.media.mobile} {
    min-height: 200px;
    width: auto;
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

const StyledTextArea = styled(TextArea)`
  width: 100%;
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
        <img src={eventType_logo} />
        <NormalText>{event?.eventType}</NormalText>
      </div>
      <div>
        <img src={location_logo} />
        <NormalText>{event?.location}</NormalText>
      </div>
      <div>
        <img src={calendar_logo} />
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

const ScoreText = styled(Text)`
  color: ${theme.color.cu_pink};
  font-size: 1.25rem;
`;

const AverageScore: React.FC<{
  averageScore: number;
  totalReviews: number;
}> = ({ averageScore, totalReviews }) => {
  return (
    <ScoreText>
      Rating Score: <span style={{ fontSize: "2.25rem" }}>{averageScore}</span>{" "}
      ({totalReviews} reviews)
    </ScoreText>
  );
};

const ReviewContainer = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  border-color: ${theme.color_level.gray.low};
  border-style: solid;
  border-radius: 0.4rem;
  padding: 5px 10px;

  ${theme.media.tablet} {
    width: 80vw;
  }
`;

const SubmitReview: React.FC<{
  eventId?: string;
}> = ({ eventId }) => {
  const [form] = Form.useForm();
  const { review, submitReview } = useReviewStore();

  const submitHandler: () => void = () => {
    console.log(form.getFieldsValue(true));
  };

  const onFormFinish = async (values: any) => {
    if (eventId) {
      const { score, comment } = values;

      submitReview(eventId, {
        score,
        comment,
      });
    }
  };

  return (
    <ReviewContainer>
      <Text>What would you rate this event?</Text>
      <Form
        form={form}
        onFinish={onFormFinish}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Item name="score">
          <Rate allowHalf={true} allowClear={false} />
        </Form.Item>

        <Form.Item name="comment">
          <StyledTextArea
            style={{ resize: "none" }}
            maxLength={250}
            showCount={true}
          />
        </Form.Item>
        <ContainedButton
          text="Submit review"
          htmlType="submit"
          onClick={submitHandler}
          style={{ minWidth: "130px", width: "25%", alignSelf: "flex-end" }}
        />
      </Form>
    </ReviewContainer>
  );
};

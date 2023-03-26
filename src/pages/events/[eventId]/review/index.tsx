import React from "react";
import styled from "styled-components";
import { Form, Input, Rate, Typography } from "antd";

import theme from "@/utils/theme";
import calendar_logo from "../../../../../asset/calendar_logo.svg";
import eventType_logo from "../../../../../asset/eventType_logo.svg";
import location_logo from "../../../../../asset/location_logo.svg";
import UserReview from "@/components/review-event/UserReview";
import { ContainedButton } from "@/common/button";

const { Text, Title } = Typography;
const { TextArea } = Input;

const mockedData = [
  {
    username: "omomo",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    username: "omomo",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    username: "omomo",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
  {
    username: "omomo",
    reviewDate: "2001-08-22",
    reviewTime: "23:11",
    score: 5,
    comment: "awesome!",
  },
];

const ReviewPage: React.FC<{}> = () => {
  // namo -> this is main component
  // InserPicture -> mock event picture
  // AverageScore -> pink score
  // SubmitReview -> submit review
  // UserReview -> user's review for each user (mock from mockedData above)
  return (
    <ContentsContainer>
      <Title>Review Event</Title>
      <EventContainer>
        <InsertPicture />
        <EventDetailSummary
          eventName="eiei show"
          creator="gu"
          eventType="SEMINAR"
          location="krisada steak house"
          startDate="Mon, 20 Aug 2001"
          endDate="Tue, 21 Aug 2001"
          startTime="8.00"
          endTime="20.00"
        />
        <RateContainer>
          <AverageScore averageScore={5} totalReviews={4} />
          <SubmitReview />
          {mockedData.map((data) => {
            return (
              <UserReview
                username={data.username}
                reviewDate={data.reviewDate}
                reviewTime={data.reviewTime}
                score={data.score}
                comment={data.comment}
              />
            );
          })}
        </RateContainer>
      </EventContainer>
    </ContentsContainer>
  );
};

export default ReviewPage;

type EventDetail = {
  eventName: string;
  creator: string;
  eventType: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

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

const EventDetailSummary: React.FC<EventDetail> = ({
  eventName,
  creator,
  eventType,
  location,
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  return (
    <DetailsContainer>
      <HeaderText>{eventName}</HeaderText>
      <NormalText>Created by {creator}</NormalText>
      <div>
        <img src={eventType_logo} />
        <NormalText>{eventType}</NormalText>
      </div>
      <div>
        <img src={location_logo} />
        <NormalText>{location}</NormalText>
      </div>
      <div>
        <img src={calendar_logo} />
        <NormalText>
          {startTime}
          {" - "}
          {endTime}
          {", "}
          {startDate}
          {" - "}
          {endDate}
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

const SubmitReview: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const submitHandler: () => void = () => {
    console.log(form.getFieldsValue(true));
  };

  return (
    <ReviewContainer>
      <Text>What would you rate this event?</Text>
      <Form form={form} style={{ display: "flex", flexDirection: "column" }}>
        <Form.Item name="rate">
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

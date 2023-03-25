import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

import calendar_logo from "../../../../../asset/calendar_logo.svg";
import eventType_logo from "../../../../../asset/eventType_logo.svg";
import location_logo from "../../../../../asset/location_logo.svg";

const { Text } = Typography;

const ReviewPage: React.FC<{}> = () => {
  return (
    <div>
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
    </div>
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

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled(Text)`
  font-size: 2.25rem;
`;

const NormalText = styled(Text)`
  font-size: 1rem;
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

import { Input, Form, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs, { Dayjs } from "dayjs";
import FestivalIcon from "@mui/icons-material/Festival";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Event } from "@/types";

const { Title } = Typography;

type EventDetailProps = {
  event: Event;
};
const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const {
    eventName,
    eventType,
    location,
    startDate,
    endDate,
    startTime,
    endTime,
    ownerName,
  } = event;
  return (
    <EventDetailContainer>
      {/* <LayoutContainer> */}
      <InformationLayout>
        <Header>
          <Title level={3} style={{ margin: 0 }}>
            {eventName}
          </Title>
          <span>Created by {ownerName}</span>
        </Header>
        <Content>
          <Space size={"small"}>
            <FestivalIcon />
            {eventType}
          </Space>
          <Space size={"small"}>
            <LocationOnIcon />
            {location}
          </Space>
          <Space size={"small"}>
            <CalendarMonthIcon />
            <div>
              {startDate ? dayjs(startDate).format("ddd, DD MMM YYYY") : ""}-
              {endDate ? dayjs(endDate).format("ddd, DD MMM YYYY") : ""},
              {startTime}-{endTime}
            </div>
          </Space>
        </Content>
      </InformationLayout>
      {/* </LayoutContainer> */}
    </EventDetailContainer>
  );
};
const EventDetailContainer = styled.div`
  height: 10rem;
  width: 100%;
`;
// const LayoutContainer = styled.div`
//   display: flex;
//   height: 100%;
//   margin: 0 auto;
//   ${theme.media.tablet} {
//     flex-direction: column;
//     align-items: center;
//     width: 85%;
//   }
//   ${theme.media.mobile} {
//     width: 100%;
//   }
// `;

const InformationLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 1rem;
  // ${theme.media.tablet} {
  //   height: 60%;
  //   width: 100%;
  // }
`;

const Content = styled.div`
  text-align: left;
  color: #000;
  height: 80%;
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: space-evenly;
  ${theme.media.tablet} {
    padding-top: 0.5rem;
  }
  ${theme.media.mobile} {
    padding-top: 0rem;
  }
`;
const Header = styled.div`
  text-align: left;
  height:20%
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  // ${theme.media.tablet} {
  //   padding-bottom: 1rem;
  //   gap: 0.5rem;
  // }
`;
export default EventDetail;

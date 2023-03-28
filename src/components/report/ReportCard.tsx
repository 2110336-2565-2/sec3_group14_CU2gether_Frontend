import { Input, Form, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { Event, Report } from "@/types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image as AntDImg } from "antd";
const { Title } = Typography;

type ReportDetailProps = {
  report: Report;
};

const ReportCard: React.FC<ReportDetailProps> = ({ report }) => {
  const { eventName, ownerName, topic, description, createdAt, imageUrl } =
    report;
  const mockImageUrl2 = [
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
  ];
  const renderImages = () =>
    mockImageUrl2.map((pic: string, index) => (
      <OneImageContainer>
        <AntDImg
          src={`${pic}`}
          style={{ fill: "Fill", objectFit: "cover" }}
        ></AntDImg>
      </OneImageContainer>
    ));
  const renderSlides = () => (
    <AntDImg.PreviewGroup>{renderImages()}</AntDImg.PreviewGroup>
  );

  return (
    <>
      <EventDetailContainer>
        <InformationLayout>
          <Header>
            <Title level={3} style={{ margin: 0 }}>
              {topic}
            </Title>
            <Typography>
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
            </Typography>
          </Header>
          <Content>
            <Typography>
              {eventName} by {ownerName}
            </Typography>
            <Typography style={{ lineHeight: "1em" }}>{description}</Typography>
            <ImagesContainer>{renderSlides()}</ImagesContainer>
          </Content>
        </InformationLayout>
      </EventDetailContainer>
    </>
  );
};
const EventDetailContainer = styled.div`
  height: 100%;
  width: 100%;
  outline: 1px solid red;
`;

const InformationLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 1rem;
`;

const Content = styled.div`
  text-align: left;
  height: 80%;
  display: flex;
  margin: 0;
  flex-direction: column;
  ${theme.media.tablet} {
    padding-top: 0.5rem;
  }
  ${theme.media.mobile} {
    padding-top: 0rem;
  }
`;
const Header = styled.div`
  text-align: left;
  align-items:flex-end;
  height:20%
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
`;
const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  column-gap: 15px;
  width: 100%;
  margin-top: 10px;
  outline: 1px solid blue;
`;

const OneImageContainer = styled.div`
  height: 100px;
  width: 150px;
  position: relative;
  outline: 1px solid blue;
  ${theme.media.mobile} {
    height: 75px;
    width: 100px;
  }
`;
export default ReportCard;

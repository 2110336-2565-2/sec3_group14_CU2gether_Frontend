import { Input, Form, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { Event, Report } from "@/types";
import { Image as AntDImg } from "antd";
import { CU_API } from "@/config";
const { Title, Paragraph } = Typography;

type ReportDetailProps = {
  report: Report;
  children?: JSX.Element;
};

const ReportCard: React.FC<ReportDetailProps> = ({ report, children }) => {
  const { eventName, ownerName, topic, description, createdAt, imageUrl } =
    report;

  const renderImages = (imageUrl: string[]) => {
    return imageUrl.map((pic: string, index) => (
      <OneImageContainer key={index}>
        <AntDImg
          src={`${CU_API}${pic}`}
          style={{ width: "100%", height: "100%" }}
          crossOrigin="anonymous"
        />
      </OneImageContainer>
    ));
  };
  const renderSlides = (imageUrl: string[]) => (
    <AntDImg.PreviewGroup>{renderImages(imageUrl)}</AntDImg.PreviewGroup>
  );

  return (
    <ReportCardContainer>
      <InformationLayout>
        <Header>
          <Title level={3} style={{ margin: "0px" }}>
            {topic}
          </Title>
          <Paragraph
            style={{
              color: `${theme.color.gray}`,
              fontSize: "16px",
              margin: "0",
            }}
          >
            {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
          </Paragraph>
        </Header>
        <Content>
          {eventName && ownerName && (
            <Paragraph style={{ fontSize: "20px" }}>
              {eventName} by {ownerName}
            </Paragraph>
          )}
          <Paragraph style={{ lineHeight: "1em", fontSize: "16px" }}>
            {description}
          </Paragraph>
          {imageUrl && (
            <ImagesContainer>{renderSlides(imageUrl)}</ImagesContainer>
          )}
          {children}
        </Content>
      </InformationLayout>
    </ReportCardContainer>
  );
};
const ReportCardContainer = styled.div`
  height: 100%;
  width: 100%;

  border: 1px solid ${theme.color.border};
  border-radius: 6px;
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
  column-gap: 5px;
  height:20%
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
`;
const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  width: 100%;
  overflow: auto;
  margin-top: 10px;
`;

const OneImageContainer = styled.div`
  height: 100px;
  flex: 0 0 150px;
  position: relative;
  ${theme.media.mobile} {
    height: 75px;
    flex: 0 0 100px;
  }
`;
export default ReportCard;

import { Input, Form, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { Event, Report } from "@/types";
import { Carousel } from "react-responsive-carousel";
import background from "../../../public/background.svg";
import Image from "next/image";
import { useModal } from "@/hooks";
import CenteredModal from "@/common/modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const { Title } = Typography;

type ReportDetailProps = {
  report: Report;
};
const mockImageUrls = [background, background, background, background];

const ReportCard: React.FC<ReportDetailProps> = ({ report }) => {
  const { eventName, ownerName, topic, description, createdAt, imageUrl } =
    report;
  const { openModal, isModalOpen, closeModal } = useModal();
  const renderShowImages = () =>
    mockImageUrls.map((pic: string, index) => (
      <OneImageContainer>
        <Image
          src={pic}
          alt={`${index}`}
          fill
          style={{ objectFit: "cover" }}
          onClick={openModal}
        ></Image>
      </OneImageContainer>
    ));

  const renderSlides = () =>
    mockImageUrls.map((pic: string, index) => (
      <SlideContainer key={index}>
        <Image
          src={pic}
          alt={`${index}`}
          width={500}
          height={500}
          style={{ objectFit: "cover" }}
        ></Image>
      </SlideContainer>
    ));

  const renderCarousel = () => (
    <CarouselContainer>
      <Carousel showArrows={true}>{renderSlides()}</Carousel>
    </CarouselContainer>
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
            <ImagesContainer>
              {renderShowImages()}
              {/* <Typography style={{ fontSize: "50px" }}>...</Typography> */}
            </ImagesContainer>
          </Content>
        </InformationLayout>
      </EventDetailContainer>
      <CenteredModal open={isModalOpen} onCancel={closeModal} footer={null}>
        {renderCarousel()}
      </CenteredModal>
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
const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  padding: 20px;
`;
const SlideContainer = styled.div`
  width: auto;
  height: auto;
`;
export default ReportCard;

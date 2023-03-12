import React from "react";
import Image from "next/image";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Space, Typography, Layout } from "antd";
import { useModal } from "@/hooks";
import CenteredModal from "@/common/modal";
import { ContainedButton, OutlinedButton } from "@/common/button";
import { SP } from "next/dist/shared/lib/utils";

type EventCardProps = {
  event: {
    id: number;
    srcImg: string;
    altImg: string;
    date: Dayjs;
    name: string;
    join: boolean;
    ownerName: string;
    eventType: string;
    location: string;
  };
};

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { srcImg, altImg, date, name, ownerName, eventType, location } = event;

  const modalFooter = (
    <Space align="end">
      <OutlinedButton text="Description" />
      <ContainedButton text={event.join ? "Unjoin" : "Join"} />
    </Space>
  );

  return (
    <>
      <EventContainer direction="vertical" onClick={openModal}>
        <Image src={srcImg} alt={altImg} width={100} height={100} />
        <Typography>{date.format("ddd, DD MMM YYYY")}</Typography>
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
      </EventContainer>
      <CenteredModal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        header={null}
        footer={null}
        width="100vw"
        mask={false}
        bodyStyle={BodyStyleCenteredModal}
      >
        <LayoutContainer>
          <Sider style={StyleSider} width="35%">
            <Image src={srcImg} alt={altImg} width={100} height={100} />
          </Sider>
          <RightLayout>
            <Header style={StyleHeader}>
              <Title style={StyleTitle} level={1}>
                <b>{name}</b>
              </Title>
              <span>Created by {ownerName}</span>
            </Header>
            <Content style={StyleContent}>
              <EventDetailContainer>
                <Space size={"middle"}>
                  {EventTypeImg}
                  {eventType}
                </Space>
              </EventDetailContainer>
              <EventDetailContainer>
                <Space size={"middle"}>
                  {LocateImg}
                  {location}
                </Space>
              </EventDetailContainer>
              <EventDetailContainer>
                <Space size={"middle"}>
                  {CalendarImg}
                  {date.format("ddd, DD MMM YYYY")}
                </Space>
              </EventDetailContainer>
            </Content>
            <Footer style={StyleFooter}>{modalFooter}</Footer>
          </RightLayout>
        </LayoutContainer>
      </CenteredModal>
    </>
  );
};

const EventContainer = styled(Space)`
  border: 1px solid;
  border-radius: 8px;
  width: 12.5vw;
  min-width: 200px;
  padding: 20px;
  margin: 5px;
`;

const ModalFooterContainer = styled(Space)`
  width: 100%;
`;

const LayoutContainer = styled(Layout)`
  width: 60vw;
  margin: 0 auto;
  background-color: rgba(255, 99, 71, 0);
`;

const RightLayout = styled(Layout)`
  width: 65%;
  margin: 0 auto;
  background-color: rgba(255, 99, 71, 0);
  font-size: 1rem;
`;

const StyleTitle = {
  color: "#fff",
  marginBottom: "0rem",
};

const EventDetailContainer = styled.div`
  height: 3rem;
  margin: 1rem auto;
`;

const StyleHeader: React.CSSProperties = {
  textAlign: "left",
  color: "#fff",
  height: "30%",
  backgroundColor: "#000000",
  opacity: 0.8,
  padding: "5rem 5rem",
};

const StyleContent: React.CSSProperties = {
  textAlign: "left",
  minHeight: "30vh",
  color: "#fff",
  backgroundColor: "#000000",
  opacity: 0.8,
  padding: "1.5rem 5rem",
  height: "50%",
};

const StyleSider: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundImage:
    "url(https://cdn.discordapp.com/attachments/457166097230069773/1084368763979317248/IMG_5824_2.png)",
  backgroundSize: "cover",
  backgroundPosition: " center center",
  backgroundRepeat: "no-repeat",
};

const StyleFooter: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: " #000000",
  opacity: 0.8,
  fontWeight: "bold",
  height: "20%",
};

const BodyStyleCenteredModal = {
  padding: "5vw",
  margin: "0",
  height: "95vh",
  backgroundImage:
    "url(https://cdn.discordapp.com/attachments/457166097230069773/1084418691598405672/IMG_5824_2.png)",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
};

const EventTypeImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.25 7.83333V5H24.5L22.75 2.51667L24.5 0H15.75V7.83333L0 18.3333V35H12.25V26.6667L17.5525 23.3333L22.75 26.6667V35H35V18.3333L19.25 7.83333Z"
      fill="white"
    />
  </svg>
);

const LocateImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 28 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 17.5C14.9625 17.5 15.7867 17.157 16.4727 16.471C17.1588 15.785 17.5012 14.9613 17.5 14C17.5 13.0375 17.157 12.2133 16.471 11.5273C15.785 10.8413 14.9613 10.4988 14 10.5C13.0375 10.5 12.2133 10.843 11.5273 11.529C10.8413 12.215 10.4988 13.0387 10.5 14C10.5 14.9625 10.843 15.7867 11.529 16.4727C12.215 17.1588 13.0387 17.5012 14 17.5ZM14 35C9.30417 31.0042 5.79717 27.293 3.479 23.8665C1.16083 20.44 0.00116667 17.2678 0 14.35C0 9.975 1.40758 6.48958 4.22275 3.89375C7.03792 1.29792 10.297 0 14 0C17.7042 0 20.9638 1.29792 23.779 3.89375C26.5942 6.48958 28.0012 9.975 28 14.35C28 17.2667 26.8403 20.4388 24.521 23.8665C22.2017 27.2942 18.6947 31.0053 14 35Z"
      fill="white"
    />
  </svg>
);

const CalendarImg = (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 32 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 21C15.4963 21 15.0738 20.832 14.7324 20.496C14.3911 20.16 14.221 19.7447 14.2222 19.25C14.2222 18.7542 14.3929 18.3382 14.7342 18.0022C15.0756 17.6662 15.4975 17.4988 16 17.5C16.5037 17.5 16.9262 17.668 17.2676 18.004C17.6089 18.34 17.779 18.7553 17.7778 19.25C17.7778 19.7458 17.6071 20.1617 17.2658 20.4977C16.9244 20.8337 16.5025 21.0012 16 21ZM8.88889 21C8.38519 21 7.96267 20.832 7.62134 20.496C7.28 20.16 7.10993 19.7447 7.11111 19.25C7.11111 18.7542 7.28178 18.3382 7.62311 18.0022C7.96445 17.6662 8.38637 17.4988 8.88889 17.5C9.39259 17.5 9.81511 17.668 10.1564 18.004C10.4978 18.34 10.6679 18.7553 10.6667 19.25C10.6667 19.7458 10.496 20.1617 10.1547 20.4977C9.81333 20.8337 9.39141 21.0012 8.88889 21ZM23.1111 21C22.6074 21 22.1849 20.832 21.8436 20.496C21.5022 20.16 21.3321 19.7447 21.3333 19.25C21.3333 18.7542 21.504 18.3382 21.8453 18.0022C22.1867 17.6662 22.6086 17.4988 23.1111 17.5C23.6148 17.5 24.0373 17.668 24.3787 18.004C24.72 18.34 24.8901 18.7553 24.8889 19.25C24.8889 19.7458 24.7182 20.1617 24.3769 20.4977C24.0356 20.8337 23.6136 21.0012 23.1111 21ZM16 28C15.4963 28 15.0738 27.832 14.7324 27.496C14.3911 27.16 14.221 26.7447 14.2222 26.25C14.2222 25.7542 14.3929 25.3382 14.7342 25.0022C15.0756 24.6663 15.4975 24.4988 16 24.5C16.5037 24.5 16.9262 24.668 17.2676 25.004C17.6089 25.34 17.779 25.7553 17.7778 26.25C17.7778 26.7458 17.6071 27.1617 17.2658 27.4977C16.9244 27.8337 16.5025 28.0012 16 28ZM8.88889 28C8.38519 28 7.96267 27.832 7.62134 27.496C7.28 27.16 7.10993 26.7447 7.11111 26.25C7.11111 25.7542 7.28178 25.3382 7.62311 25.0022C7.96445 24.6663 8.38637 24.4988 8.88889 24.5C9.39259 24.5 9.81511 24.668 10.1564 25.004C10.4978 25.34 10.6679 25.7553 10.6667 26.25C10.6667 26.7458 10.496 27.1617 10.1547 27.4977C9.81333 27.8337 9.39141 28.0012 8.88889 28ZM23.1111 28C22.6074 28 22.1849 27.832 21.8436 27.496C21.5022 27.16 21.3321 26.7447 21.3333 26.25C21.3333 25.7542 21.504 25.3382 21.8453 25.0022C22.1867 24.6663 22.6086 24.4988 23.1111 24.5C23.6148 24.5 24.0373 24.668 24.3787 25.004C24.72 25.34 24.8901 25.7553 24.8889 26.25C24.8889 26.7458 24.7182 27.1617 24.3769 27.4977C24.0356 27.8337 23.6136 28.0012 23.1111 28ZM3.55556 35C2.57778 35 1.74045 34.657 1.04356 33.971C0.346669 33.285 -0.00118217 32.4613 3.0183e-06 31.5V7C3.0183e-06 6.0375 0.348447 5.21325 1.04534 4.52725C1.74222 3.84125 2.57897 3.49883 3.55556 3.5H5.33334V0H8.88889V3.5H23.1111V0H26.6667V3.5H28.4444C29.4222 3.5 30.2596 3.843 30.9564 4.529C31.6533 5.215 32.0012 6.03867 32 7V31.5C32 32.4625 31.6516 33.2867 30.9547 33.9727C30.2578 34.6587 29.421 35.0012 28.4444 35H3.55556ZM3.55556 31.5H28.4444V14H3.55556V31.5Z"
      fill="white"
    />
  </svg>
);

export default EventCard;

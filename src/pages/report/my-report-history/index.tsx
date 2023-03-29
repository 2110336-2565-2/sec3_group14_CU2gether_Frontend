import React from "react";
import styled from "styled-components";
import { Typography, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import ReportCard from "@/components/report/ReportCard";
import { Report } from "@/types";
import dayjs from "dayjs";
const { Content } = Layout;
const { Title } = Typography;

const MyReportHistory: React.FC<{}> = ({}) => {
  const mocktime: string = dayjs().format();
  const mockImageUrl = [
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
  ];
  const mockEventReport: Report = {
    topic: "topic",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis soluta deleniti provident temporibus deserunt officia inventore maxime modi. Itaque sint voluptatem eos inventore exercitationem nesciunt, deserunt ex. Tempore, eos!",
    createdAt: mocktime,
    eventName: "eventname",
    ownerName: "ownername",
    imageUrl: mockImageUrl,
  };
  const mockProblemReport: Report = {
    topic: "topic",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis soluta deleniti provident temporibus deserunt officia inventore maxime modi. Itaque sint voluptatem eos inventore exercitationem nesciunt, deserunt ex. Tempore, eos!",
    createdAt: mocktime,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.cu_pink}`,
        },
        components: {
          Button: {
            colorPrimary: `${theme.color.primary}`,
            colorPrimaryHover: `${theme.color.primaryHover}`,
          },
        },
      }}
    >
      <ReportContainer>
        <HeaderContainer>
          <Title className="ant-typography-title" level={1}>
            My Report History
          </Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            <Title className="ant-typography-title" level={2}>
              Event reports
            </Title>
            <ReportCard report={mockEventReport} />
            <ReportCard report={mockEventReport} />
            <Title className="ant-typography-title" level={2}>
              Problem reports
            </Title>
            <ReportCard report={mockProblemReport}></ReportCard>
            <ReportCard report={mockProblemReport}></ReportCard>
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ConfigProvider>
  );
};
const ReportContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  // outline: 1px solid blue;
  width: 70%;
  ${theme.media.tablet} {
    width: 90%;
  }
  ${theme.media.mobile} {
    width: 95%;
  }
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  // outline: 1px solid red;
  font-size: 20px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: left;
  padding-top: 5vh;
`;

const LayoutContainer = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-content: start;
  width: 100%;
`;

export default MyReportHistory;

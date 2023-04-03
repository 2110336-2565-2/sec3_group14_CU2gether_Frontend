import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import ReportCard from "@/components/report/ReportCard";
import { Report } from "@/types";
import ReportProvider from "@/components/report/Provider";
import useReportStore from "@/hooks/useReportStore";
const { Content } = Layout;
const { Title } = Typography;

const MyReportHistory: React.FC<{}> = ({}) => {
  const { eventReports, webReports, fetchMyEventReports, fetchMyWebReports } =
    useReportStore();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMyEventReports(), fetchMyWebReports()]);
      } catch (error) {}
      setLoading(false);
    };
    fetchData();
  }, []);
  const renderReportList = (reportList: Report[] = []) =>
    reportList.map((report: Report, index) => (
      <ReportCard report={report} key={`${report.topic}${index}`}></ReportCard>
    ));

  return (
    <ReportProvider>
      <ReportContainer>
        <HeaderContainer>
          <Title level={1}>My Report History</Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            <Title level={2} style={{ margin: "0 " }}>
              Event reports
            </Title>
            {!loading && renderReportList(eventReports)}
            <Title level={2} style={{ margin: "0 " }}>
              Problem reports
            </Title>
            {!loading && renderReportList(webReports)}
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ReportProvider>
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
  gap: 20px;
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

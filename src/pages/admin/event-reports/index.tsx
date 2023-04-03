import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import ReportCard from "@/components/report/ReportCard";
import { Report } from "@/types";
import useEventReportStore from "@/hooks/useEventReportStore";
import ReportProvider from "@/components/report/Provider";
import { OutlinedButton } from "@/common/button";
const { Content } = Layout;
const { Title } = Typography;

type EventReportsPageProps = {};

const EventReportsPage: React.FC<EventReportsPageProps> = ({}) => {
  const { eventReports, fetchEventReports, updateEventReportStatus } =
    useEventReportStore();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await fetchEventReports({});
      } catch (err) {}
      setLoading(false);
    };
    getData();
  }, []);
  const updateReportStatus = async (reportId: string) => {
    await updateEventReportStatus(reportId);
  };
  const renderReportList = (reportList: Report[] = []) =>
    reportList.map((report: Report, index) => (
      <ReportCard report={report} key={`${report.topic}${index}`}>
        <ButtonContainer>
          <OutlinedButton
            text="Archive"
            onClick={updateReportStatus(report.id.toString())}
          />
        </ButtonContainer>
      </ReportCard>
    ));
  return (
    <ReportProvider>
      <ReportContainer>
        <HeaderContainer>
          <Title level={1}>Event Reports</Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            {!loading && renderReportList(eventReports)}
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  // outline: 1px solid red;
`;
export default EventReportsPage;

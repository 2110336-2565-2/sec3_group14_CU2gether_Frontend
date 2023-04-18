import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Layout, ConfigProvider, Empty } from "antd";
import theme from "@/utils/theme";
import ReportCard from "@/components/report/ReportCard";
import { ROLE, Report, ReportStatus } from "@/types";
import ReportProvider from "@/components/report/Provider";
import { OutlinedButton } from "@/common/button";
import useReportStore from "@/hooks/useReportStore";
import useProfileStore from "@/hooks/useProfileStore";
import { useModal } from "@/hooks";
import { AdminLoginModal } from "@/components/login";
const { Content } = Layout;
const { Title } = Typography;

type EventReportsPageProps = {};

const EventReportsPage: React.FC<EventReportsPageProps> = ({}) => {
  const { eventReports, fetchEventReports, updateEventReportStatus } =
    useReportStore();
  const { openModal, closeModal, isModalOpen } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await fetchEventReports({});
      } catch (err) {
        openModal();
      }
      setLoading(false);
    };
    getData();
  }, []);
  const archiveReport = async (reportId: string) => {
    await updateEventReportStatus(reportId, {
      adminNote: "",
      problemStatus: ReportStatus.CLOSED,
    });
    await fetchEventReports({});
  };
  const renderReportList = (reportList: Report[] = []) =>
    reportList.length > 0 ? (
      reportList.map((report: Report, index) => (
        <ReportCard report={report} key={`${report.topic}${index}`}>
          <ButtonContainer>
            <OutlinedButton
              text="Archive"
              style={{ width: "150px" }}
              onClick={() => archiveReport(report.id.toString())}
            />
          </ButtonContainer>
        </ReportCard>
      ))
    ) : (
      <EmptyWrapper>
        <Empty description={"No Event Reports"} />
      </EmptyWrapper>
    );
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
        <AdminLoginModal open={isModalOpen} closeModal={closeModal} />
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
const EmptyWrapper = styled.div`
  display: flex;
  height: 100%;
  align-self: center;
`;
export default EventReportsPage;

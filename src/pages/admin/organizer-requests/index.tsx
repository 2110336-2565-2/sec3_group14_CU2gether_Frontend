import OrganizerRequestCard from "@/components/organizer-request/card";
import useAdminStore from "@/hooks/useAdminStore";
import theme from "@/utils/theme";
import { Typography } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

type OrganizerRequestsPageProps = {};

const { Title } = Typography;

const OrganizerRequestsPage: React.FC<OrganizerRequestsPageProps> = ({}) => {
  const { organizerRequests, fetchOrganizerRequests } = useAdminStore();

  useEffect(() => {
    fetchOrganizerRequests();
  }, []);

  return (
    <RequestContainer>
      <Title>Organizer Requests</Title>
      <OrganizerRequestContainer>
        {organizerRequests.map((request, idx) => (
          <OrganizerRequestCard key={idx} request={request} />
        ))}
      </OrganizerRequestContainer>
    </RequestContainer>
  );
};

const RequestContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  padding: 2% 10%;
  ${theme.media.mobile} {
    padding: 2% 5%;
  }
`;
const OrganizerRequestContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2vh;
  padding: 1%;
`;

export default OrganizerRequestsPage;

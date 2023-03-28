import { Card, Typography } from "antd";
import React from "react";
import styled from "styled-components";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ContainedButton, OutlinedButton } from "@/common/button";
import { OrganizerRequest } from "@/types";

type OrganizerRequestCardProps = {
  request: OrganizerRequest;
};

const { Title, Paragraph, Text } = Typography;

const OrganizerRequestCard: React.FC<OrganizerRequestCardProps> = ({
  request,
}) => {
  const { email, name, coorName, phone, description, status } = request;
  return (
    <Card>
      <Title level={3}>{name}</Title>
      <Paragraph>{email}</Paragraph>
      <Title level={4}>Coordinator information</Title>
      <Paragraph>{coorName}</Paragraph>
      <Paragraph>{phone}</Paragraph>
      <Title level={4}>Description</Title>
      <Paragraph>{description}</Paragraph>
      <ButtonContainer>
        <OutlinedButton
          text={
            <ButtonTextContainer>
              <CancelIcon />
              <Text>Reject</Text>
            </ButtonTextContainer>
          }
        />
        <ContainedButton
          text={
            <ButtonTextContainer>
              <CheckCircleIcon />
              <Text>Approve</Text>
            </ButtonTextContainer>
          }
        />
      </ButtonContainer>
    </Card>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: center;
  gap: 5vw;
`;

const ButtonTextContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default OrganizerRequestCard;

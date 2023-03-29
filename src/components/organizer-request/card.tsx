import { Card, message, Typography } from "antd";
import React from "react";
import styled from "styled-components";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ContainedButton, OutlinedButton } from "@/common/button";
import { OrganizerRequest } from "@/types";
import admin from "api/auth";

type OrganizerRequestCardProps = {
  request: OrganizerRequest;
};

const { Title, Paragraph, Text } = Typography;

const OrganizerRequestCard: React.FC<OrganizerRequestCardProps> = ({
  request,
}) => {
  const { id, email, name, coorName, phone, description, status } = request;
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
          onClick={async () => {
            try {
              await admin.approveOrganizer(id);
              message.success("Rejected organizer request");
            } catch (error: any) {
              message.error(error.message);
            }
          }}
        />
        <ContainedButton
          text={
            <ButtonTextContainer>
              <CheckCircleIcon />
              <Text>Approve</Text>
            </ButtonTextContainer>
          }
          onClick={async () => {
            try {
              await admin.approveOrganizer(id);
              message.success("Rejected organizer request");
            } catch (error: any) {
              message.error(error.message);
            }
          }}
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

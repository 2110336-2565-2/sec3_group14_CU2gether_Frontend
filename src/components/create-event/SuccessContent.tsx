import React from "react";
import { Button, Result, Typography } from "antd";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 45%;
  gap: 15px;
`;

const { Title, Text } = Typography;

const SuccessContent: React.FC<{}> = ({}) => {
  const successText = [
    "You can edit your event information by clicking “My Events” on the page header and select the event you want to edit.",
    "Remember! please feel free to invite your dumb friends to your event.",
  ];
  return (
    <ContentContainer>
      <Title level={1} style={{ marginBottom: 5 }}>
        Create Success!
      </Title>
      <Text>{successText[0]}</Text>
      <Text>{successText[1]}</Text>
      <Button>Back to Home</Button>
    </ContentContainer>
  );
};

export default SuccessContent;

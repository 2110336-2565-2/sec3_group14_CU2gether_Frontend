import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SuccessContent: React.FC<{}> = ({}) => {
  const successText = [
    "You can edit your event information by clicking “My Events” on the page header and select the event you want to edit.",
    "Remember! please feel free to invite your dumb friends to your event.",
  ];
  return (
    <ContentContainer>
      <h1>Create Success!</h1>
      <p>{successText[0]}</p>
      <p>{successText[1]}</p>
      <Button>Back to Home</Button>
    </ContentContainer>
  );
};

export default SuccessContent;

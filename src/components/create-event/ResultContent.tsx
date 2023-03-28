import React from "react";
import { Result, Typography } from "antd";
import styled from "styled-components";
import { ContainedButton, OutlinedButton } from "@/common/button";

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const { Text } = Typography;

const ResultContent: React.FC<{
  isSuccess: boolean;
  retryHandler: () => void;
  previousPageHandler: () => void;
}> = ({ isSuccess, retryHandler, previousPageHandler }) => {
  const SuccessDetail = () => {
    return (
      <TextContainer style={{ display: "flex", flexDirection: "column" }}>
        <Text>
          You can edit your event information by clicking “My Events” on the
          page header and select the event you want to edit.
        </Text>
        <Text>
          Remember! please feel free to invite your dumb friends to your event.
        </Text>
      </TextContainer>
    );
  };

  const BackButton = () => {
    return (
      <ContainedButton
        text="Back to Home"
        onClick={previousPageHandler}
        style={{ width: 130 }}
      />
    );
  };

  const RetryButton = () => {
    return (
      <OutlinedButton
        text="Retry"
        onClick={retryHandler}
        style={{ width: 130 }}
      />
    );
  };

  const ErrorButtons = () => {
    return (
      <ButtonContainer>
        {RetryButton()}
        {BackButton()}
      </ButtonContainer>
    );
  };

  return isSuccess ? (
    <Result
      status="success"
      title="Create Success!"
      subTitle={SuccessDetail()}
      extra={BackButton()}
    />
  ) : (
    <Result
      status="error"
      title="Create Failed"
      subTitle="Something went wrong. Please try it again."
      extra={ErrorButtons()}
    />
  );
};

export default ResultContent;

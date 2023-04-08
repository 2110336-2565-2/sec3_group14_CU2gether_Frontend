import React, { useEffect, useState } from "react";
import { Layout, QRCode, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { OutlinedButton } from "@/common/button";
import { useMediaQuery } from "react-responsive";
type TopupConfirmProps = {
  amount: number | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
};

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;
const mockvalue = {
  Method: "QR Payment",
  CreateAt: dayjs().format("D MMMM YYYY, HH:mm"),
  Status: "Pending",
  Amount: (300).toFixed(2),
};

export const TopupConfirm: React.FC<TopupConfirmProps> = ({
  amount,
  onNextStep,
  onPrevStep,
}) => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(280);
  const mobile = useMediaQuery({ query: "(max-width: 425px)" });
  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);
  useEffect(() => {
    isMobileScreen ? setSize(140) : setSize(280);
  }, [isMobileScreen]);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      console.log("polling");
      //check status isSuccess then call on Next Step
      //if (success){onNextStep}
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleBack = () => {
    onPrevStep();
  };
  const renderInfo = () =>
    Object.entries(mockvalue).map(([key, value]) => {
      return (
        <DetailRow>
          <TitleContainer>
            <Title level={5}>{key}</Title>
          </TitleContainer>
          <Text>{value}</Text>
        </DetailRow>
      );
    });
  return (
    <TopUpContainer>
      <Content>
        <ContentContainer>
          <QRCode value="www.google.com" size={size}></QRCode>
          <InfoContainer>{renderInfo()}</InfoContainer>
          <ButtonContainer>
            <OutlinedButton
              onClick={handleBack}
              text="Cancel"
              style={{ width: "100%" }}
            />
          </ButtonContainer>
        </ContentContainer>
      </Content>
    </TopUpContainer>
  );
};
const TopUpContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  ${theme.media.mobile} {
    width: 95%;
  }
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 290px;
  width: 50%;
  padding-left: 5%;
  gap: 10px;
  ${theme.media.tablet} {
    width: 100%;
  }
  ${theme.media.mobile} {
    width: 100%;
    padding-left: 20%;
  }
`;
const DetailRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
  width: 100%;
  .ant-typography {
    margin: 0;
  }
`;
const TitleContainer = styled.div`
  width: 35%;
`;
const ButtonContainer = styled.div`
  width: 120px;
  ${theme.media.mobile} {
    width: 100px;
  }
`;

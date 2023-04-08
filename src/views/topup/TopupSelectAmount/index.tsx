import { OutlinedButton } from "@/common/button";
import useTopupStore from "@/hooks/useTopupStore";
import theme from "@/utils/theme";
import { Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

type TopupSelectAmountProps = {
  amount: number;
  setAmount: (amount: number) => void;
};

const { Title, Text } = Typography;

export const TopupSelectAmount: React.FC<TopupSelectAmountProps> = ({
  amount,
  setAmount,
}) => {
  const { cash } = useTopupStore();
  return (
    <>
      <Title>Top up</Title>
      <DetailContainer>
        <DetailRow>
          <TitleContainer>
            <Title level={5}>Your Balance</Title>
          </TitleContainer>
          <Text>฿ {cash.toFixed(2)}</Text>
        </DetailRow>
        <DetailRow>
          <TitleContainer>
            <Title level={5}>Amount</Title>
          </TitleContainer>
          <AmountContainer>
            <ButtonContainer>
              <OutlinedButton text="+100" />
              <OutlinedButton text="+500" />
              <OutlinedButton text="+1000" />
            </ButtonContainer>
          </AmountContainer>
        </DetailRow>
      </DetailContainer>
    </>
  );
};

const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`;

const DetailRow = styled.div`
  display: flex;
  padding-left: 15%;
  align-items: center;
  width: 100%;
  ${theme.media.tablet} {
    padding-left: 5%;
  }
  .ant-typography {
    margin: 0;
  }
`;
const TitleContainer = styled.div`
  width: 35%;
`;

const AmountContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 330px;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

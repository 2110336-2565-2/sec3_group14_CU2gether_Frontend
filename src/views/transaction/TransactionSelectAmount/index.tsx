import { Input, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import PaymentIcon from "@mui/icons-material/Payment";

import { ContainedButton, OutlinedButton } from "@/common/button";
import useProfileStore from "@/hooks/useProfileStore";
import useTransactionStore from "@/hooks/useTransactionStore";
import theme from "@/utils/theme";

type TransactionSelectAmountProps = {
  onNextStep: () => void;
};

const { Title, Text } = Typography;

export const TransactionSelectAmount: React.FC<
  TransactionSelectAmountProps
> = ({ onNextStep }) => {
  const { credits } = useProfileStore();
  const { createTransaction } = useTransactionStore();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);

  const onClickNext = async () => {
    try {
      await createTransaction(amount);
    } catch (error) {}
    onNextStep();
  };

  return (
    <>
      <Title>Top up</Title>
      <DetailContainer>
        <DetailRow>
          <Title level={5}>Your Balance</Title>
          <Text>฿ {credits.toFixed(2)}</Text>
        </DetailRow>
        <DetailRow>
          <Title level={5}>Amount</Title>
          <Input
            prefix="฿"
            value={amount}
            onChange={(e: any) => setAmount(+e.target.value)}
          />
        </DetailRow>
        <OptionRow>
          <OutlinedButton text="+100" onClick={() => setAmount(amount + 100)} />
          <OutlinedButton text="+500" onClick={() => setAmount(amount + 500)} />
          <OutlinedButton
            text="+1000"
            onClick={() => setAmount(amount + 1000)}
          />
        </OptionRow>
      </DetailContainer>
      <ButtonContainer>
        <OutlinedButton text="Cancel" onClick={router.back} />
        <ContainedButton text="Next" onClick={onClickNext} />
      </ButtonContainer>
    </>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin: 20px 0;
  padding-left: 5%;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  width: 100%;
  align-items: center;
  .ant-typography {
    margin: 0;
  }
`;

const OptionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 150px;
  gap: 10px;
  ${theme.media.tablet} {
    margin-left: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  .ant-btn {
    width: 100px;
  }
`;

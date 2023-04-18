import React, { useState } from "react";
import styled from "styled-components";

import theme from "@/utils/theme";
import {
  TransactionConfirm,
  TransactionResult,
  TransactionSelectAmount,
} from "@/views/transaction";

type TransactionPageProps = {};

const TransactionPage: React.FC<TransactionPageProps> = () => {
  const [step, setStep] = useState<number>(0);
  const onNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const onPrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const paymentStep = () => {
    switch (step) {
      case 0:
        return <TransactionSelectAmount onNextStep={onNextStep} />;
      case 1:
        return (
          <TransactionConfirm onNextStep={onNextStep} onPrevStep={onPrevStep} />
        );
      default:
        return <TransactionResult />;
    }
  };

  return <PaymentContainer>{paymentStep()}</PaymentContainer>;
};

const PaymentContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100%;
  padding: 2% 20%;
  ${theme.media.tablet} {
    padding: 2% 10%;
  }
`;

export default TransactionPage;

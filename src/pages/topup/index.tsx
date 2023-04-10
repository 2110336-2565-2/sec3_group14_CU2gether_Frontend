import React, { useState } from "react";
import styled from "styled-components";

import theme from "@/utils/theme";
import { TopupConfirm, TopupResult, TopupSelectAmount } from "@/views/topup";

type TopupPageProps = {};

const TopupPage: React.FC<TopupPageProps> = () => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>();
  const [transactionID, setTransactionID] = useState<number>(4);
  const [QRURL, setQRURL] = useState<string>("www.google.com");
  const onNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const onPrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const paymentStep = () => {
    switch (step) {
      case 0:
        return <TopupSelectAmount amount={amount} setAmount={setAmount} />;
      case 1:
        return (
          <TopupConfirm
            QRURL={QRURL}
            transactionID={`${transactionID}`}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
          />
        );
      default:
        return <TopupResult transactionID={`${transactionID}`} />;
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

export default TopupPage;

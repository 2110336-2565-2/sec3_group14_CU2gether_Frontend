import React, { useState } from "react";
import styled from "styled-components";

import theme from "@/utils/theme";
import { TopupConfirm, TopupResult, TopupSelectAmount } from "@/views/topup";

type TopupPageProps = {};

const TopupPage: React.FC<TopupPageProps> = () => {
  const [step, setStep] = useState<number>(0);
  const [amount, setAmount] = useState<number>();

  const onNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const onPrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const paymentStep = () => {
    switch (step) {
      case 0:
        return <TopupSelectAmount />;
      case 1:
        return <TopupConfirm />;
      default:
        return <TopupResult />;
    }
  };

  return <PaymentContainer>{paymentStep()}</PaymentContainer>;
};

const PaymentContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  padding: 10% 20%;
  ${theme.media.tablet} {
    padding: 10% 10%;
  }
`;

export default TopupPage;

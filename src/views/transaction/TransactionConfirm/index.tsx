import React, { useEffect, useState } from "react";
import { Layout, QRCode, Space, Typography } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import { OutlinedButton } from "@/common/button";
import { useMediaQuery } from "react-responsive";
import useTransactionStore from "@/hooks/useTransactionStore";
import { useRouter } from "next/router";
type TransactionConfirmProps = {
  onNextStep: () => void;
  onPrevStep: () => void;
  QRURL: string;
  transactionID: string;
};

const { Content } = Layout;
const { Text, Title } = Typography;
let value = {
  //default value
  Method: "QR Payment",
  CreateAt: dayjs().format("D MMMM YYYY, HH:mm"),
  Status: "Pending",
  Amount: (0).toFixed(2),
};

export const TransactionConfirm: React.FC<TransactionConfirmProps> = ({
  onNextStep,
  onPrevStep,
  QRURL,
  transactionID,
}) => {
  const { transaction, getTransaction, deleteTransaction } =
    useTransactionStore();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(280);
  const mobile = useMediaQuery({ query: "(max-width: 425px)" });
  const router = useRouter();

  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);
  useEffect(() => {
    isMobileScreen ? setSize(140) : setSize(280);
  }, [isMobileScreen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTransaction(transactionID);
      } catch (error) {
        router.push("/");
      }
    };
    const intervalId = setInterval(async () => {
      await getTransaction(transactionID);
    }, 5000);
    fetchData();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      event.preventDefault();
      if (transaction) {
        await deleteTransaction(`${transaction.id}`);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (transaction) {
      if (transaction.isCompleted) onNextStep();
      value.Amount = transaction.amount.toFixed(2);
      value.CreateAt = dayjs(transaction.createdAt).format(
        "D MMMM YYYY, HH:mm"
      );
    }
  }, [transaction]);

  const handleBack = async () => {
    if (transaction) {
      await deleteTransaction(`${transaction.id}`);
    }
    onPrevStep();
  };
  const renderInfo = () =>
    Object.entries(value).map(([key, value]) => {
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
    <TransactionContainer>
      <Content>
        <ContentContainer>
          <QRCode value={QRURL} size={size}></QRCode>
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
    </TransactionContainer>
  );
};
const TransactionContainer = styled(Layout)`
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

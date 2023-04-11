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
type ShowInfo = {
  Method: string;
  CreateAt: string;
  Status: string;
  Amount: string;
};
export const TransactionConfirm: React.FC<TransactionConfirmProps> = ({
  onNextStep,
  onPrevStep,
}) => {
  const { transaction, QRUrl, getTransaction, deleteTransaction } =
    useTransactionStore();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(280);
  const [showInfo, setShowInfo] = useState<ShowInfo>(value);
  const mobile = useMediaQuery({ query: "(max-width: 425px)" });

  useEffect(() => {
    setIsMobileScreen(mobile);
  }, [mobile]);
  useEffect(() => {
    isMobileScreen ? setSize(140) : setSize(280);
  }, [isMobileScreen]);

  useEffect(() => {
    if (transaction) {
      setShowInfo({
        ...showInfo,
        Amount: transaction.amount.toFixed(2),
        CreateAt: dayjs(transaction.createdAt).format("D MMMM YYYY, HH:mm"),
      });
    }
    const intervalId = setInterval(async () => {
      if (transaction) {
        await getTransaction(`${transaction.id}`);
      }
    }, 5000);
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
    if (transaction && transaction.isCompleted) {
      onNextStep();
    }
  }, [transaction]);

  const handleBack = async () => {
    if (transaction) {
      await deleteTransaction(`${transaction.id}`);
    }
    onPrevStep();
  };
  const renderInfo = () =>
    Object.entries(showInfo).map(([key, value]) => {
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
          <QRCode value={QRUrl ? QRUrl : ""} size={size}></QRCode>
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

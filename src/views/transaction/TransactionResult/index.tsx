import theme from "@/utils/theme";
import { Layout, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ContainedButton } from "@/common/button";
import { useRouter } from "next/router";
import useTransactionStore from "@/hooks/useTransactionStore";
type TransactionResultProps = { transactionID: string };
const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;
const value = {
  Method: "QR Payment",
  CreateAt: dayjs().format("D MMMM YYYY, HH:mm"),
  Status: "Success",
  Amount: (300).toFixed(2),
};
export const TransactionResult: React.FC<TransactionResultProps> = ({
  transactionID,
}) => {
  const { transaction, getTransaction } = useTransactionStore();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(280);
  const mobile = useMediaQuery({ query: "(max-width: 425px)" });
  const router = useRouter();

  useEffect(() => {
    setIsMobileScreen(mobile);
    isMobileScreen ? setSize(140) : setSize(280);
  }, [mobile]);

  useEffect(() => {
    console.log("start");
    const fetchData = async () => {
      await getTransaction(transactionID);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(1);
    if (transaction) {
      value.Amount = transaction.amount.toFixed(2);
      value.CreateAt = dayjs(transaction.createdAt).format(
        "D MMMM YYYY, HH:mm"
      );
    }
  }, []);
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
  const handleBack = () => {
    router.push("/");
  };
  return (
    <TransactionContainer>
      <Content>
        <ContentContainer>
          <CheckCircleOutlineIcon
            style={{ fontSize: `${size}px`, color: `${theme.color.primary}` }}
          ></CheckCircleOutlineIcon>
          <InfoContainer>{renderInfo()}</InfoContainer>
          <ButtonContainer>
            <ContainedButton
              onClick={handleBack}
              text="Back to home"
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

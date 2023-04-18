import { Form, InputNumber, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

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
  const [form] = Form.useForm();
  const { credits } = useProfileStore();
  const { createTransaction } = useTransactionStore();
  const router = useRouter();
  const amount = Form.useWatch("amount", form);

  const onClickNext = async (values: { amount: number }) => {
    const { amount } = values;
    try {
      await createTransaction(amount);
      onNextStep();
    } catch (error) {}
  };

  return (
    <Form
      form={form}
      onFinish={onClickNext}
      initialValues={{ amount: 100 }}
      autoComplete="off"
    >
      <Title>Top up</Title>
      <DetailContainer>
        <DetailRow>
          <Title level={5}>Your Balance</Title>
          <Text>฿ {credits.toFixed(2)}</Text>
        </DetailRow>
        <DetailRow>
          <Title level={5}>Amount</Title>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter your amount",
              },
              {
                type: "number",
                min: 100,
                message: "The minimum amount is 100 THB",
              },
            ]}
            shouldUpdate={(prevValues, curValues) =>
              prevValues.additional !== curValues.additional
            }
          >
            <InputNumber
              prefix="฿"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              controls={false}
            />
          </Form.Item>
        </DetailRow>
        <OptionRow>
          <OutlinedButton
            text="+100"
            onClick={() =>
              form.setFieldsValue({ amount: amount ? amount + 100 : 100 })
            }
          />
          <OutlinedButton
            text="+500"
            onClick={() =>
              form.setFieldsValue({ amount: amount ? amount + 500 : 500 })
            }
          />
          <OutlinedButton
            text="+1000"
            onClick={() =>
              form.setFieldsValue({ amount: amount ? amount + 1000 : 1000 })
            }
          />
        </OptionRow>
      </DetailContainer>
      <ButtonContainer>
        <OutlinedButton text="Cancel" onClick={router.back} />
        <ContainedButton text="Next" htmlType="submit" />
      </ButtonContainer>
    </Form>
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
  .ant-form-item {
    margin: 0;
  }
  .ant-input-number-affix-wrapper {
    width: 100%;
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

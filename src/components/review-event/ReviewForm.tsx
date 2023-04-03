import { ContainedButton } from "@/common/button";
import useReviewStore from "@/hooks/useReviewStore";
import { Form, Input, Rate, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

type ReviewFormProps = {
  eventId: string;
};

const { Text } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export const ReviewForm: React.FC<ReviewFormProps> = ({ eventId }) => {
  const [form] = Form.useForm();
  const { submitReview } = useReviewStore();

  const submitHandler: () => void = () => {
    console.log(form.getFieldsValue(true));
  };

  const onFormFinish = async (values: any) => {
    if (eventId) {
      const { score, comment } = values;

      await submitReview(eventId, {
        score,
        comment,
      });
      form.resetFields();
    }
  };

  return (
    <ReviewContainer>
      <Text>What would you rate this event?</Text>
      <Form
        form={form}
        onFinish={onFormFinish}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Item name="score">
          <Rate allowHalf={true} allowClear={false} />
        </Item>

        <Item name="comment">
          <DescriptionTextArea
            style={{ resize: "none" }}
            maxLength={250}
            showCount={true}
          />
        </Item>
        <ContainedButton
          text="Submit review"
          htmlType="submit"
          onClick={submitHandler}
          style={{ minWidth: "130px", width: "25%", alignSelf: "flex-end" }}
        />
      </Form>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  width: 100%;
`;

const DescriptionTextArea = styled(TextArea)`
  resize: none;
  width: 100%;
`;

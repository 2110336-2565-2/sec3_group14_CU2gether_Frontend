import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Steps, Button, Form, ConfigProvider } from "antd";
import styled from "styled-components";

import BasicsContent from "@/components/create-event/BasicsContent";
import LocationContent from "@/components/create-event/LocationContent";
import DescriptionContent from "@/components/create-event/DescriptionContent";
import theme from "@/utils/theme";
import SuccessContent from "@/components/create-event/SuccessContent";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 70px;
  justify-content: center;
`;

const createEvent: React.FC<{}> = ({}) => {
  const [form] = Form.useForm();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const dateAndTimeChecker = () => {
    const {
      "start-time": timeStart,
      "stop-time": timeStop,
      "start-date": dateStart,
      "stop-date": dateStop,
    } = form.getFieldsValue([
      "start-time",
      "stop-time",
      "start-date",
      "stop-date",
    ]);

    const isTimeValid = timeStart <= timeStop ? true : false;
    const isDateValid = dateStart <= dateStop ? true : false;

    if (isTimeValid) {
      form.setFieldValue("time", "valid");
    } else {
      form.setFieldValue("time", undefined);
    }

    if (isDateValid) {
      form.setFieldValue("date", "valid");
    } else {
      form.setFieldValue("date", undefined);
    }
  };

  const goNextForm = () => {
    if (currentPageIndex === 0) {
      dateAndTimeChecker();
    }
    form
      .validateFields()
      .then(() => {
        setCurrentPageIndex(currentPageIndex + 1);
      })
      .catch((err) => console.log(err));
  };

  const goPreviousForm = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onFinish = () => {
    const allData = form.getFieldsValue(true);
    console.log(allData);
    setIsSuccess(true);
  };

  const content = [
    <BasicsContent />,
    <LocationContent />,
    <DescriptionContent />,
  ];

  const BackButton = () => {
    return currentPageIndex === 0 ? (
      <Button style={{ width: 150 }}>Cancel</Button>
    ) : (
      <Button onClick={goPreviousForm} style={{ width: 150 }}>
        Back
      </Button>
    );
  };

  const NextButton = () => {
    return currentPageIndex === 2 ? (
      <Button type="primary" style={{ width: 150 }} htmlType="submit">
        Submit
      </Button>
    ) : (
      <Button onClick={goNextForm} type="primary" style={{ width: 150 }}>
        Next
      </Button>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.cu_pink}`,
        },
        components: {
          Button: {
            colorPrimary: `${theme.color.primary}`,
            colorPrimaryHover: `${theme.color.primaryHover}`,
          },
        },
      }}
    >
      <ContentContainer>
        <Steps
          current={currentPageIndex}
          items={[
            { title: "Basics" },
            { title: "Location" },
            { title: "Description" },
          ]}
          style={{ width: 400 }}
          labelPlacement="vertical"
        />
        {isSuccess ? (
          <SuccessContent />
        ) : (
          <Form
            onFinish={onFinish}
            style={{
              height: 450,
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
            form={form}
          >
            {content[currentPageIndex]}
            <ButtonContainer>
              <BackButton />
              <NextButton />
            </ButtonContainer>
          </Form>
        )}
      </ContentContainer>
    </ConfigProvider>
  );
};

export default createEvent;

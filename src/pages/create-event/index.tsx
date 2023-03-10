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
  const [current, setCurrent] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const goNextForm = () => {
    setCurrent(current + 1);
  };
  const goPreviousForm = () => {
    setCurrent(current - 1);
  };

  const dateAndTimeChecker = () => {
    const { timeStart, timeStop, dateStart, dateStop } = form.getFieldsValue([
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

  const onFinish = () => {
    console.log("finish!!");
    const allData = form.getFieldsValue(true);
    console.log(allData);
  };

  const content = [
    <BasicsContent />,
    <LocationContent />,
    <DescriptionContent />,
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.cu_pink}`,
        },
        components: {
          Button: {
            colorPrimary: `${theme.color.primary}`,
            // colorPrimaryHover: `${theme.color.primary}`,
            colorPrimaryHover: "rgba(237,153,142,255)",
          },
        },
      }}
    >
      <ContentContainer>
        <Steps
          current={current}
          items={[
            { title: "Basics" },
            { title: "Location" },
            { title: "Description" },
          ]}
          style={{ width: 400 }}
          labelPlacement="vertical"
        />
        {current === 3 ? (
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
            {content[current]}
            <ButtonContainer>
              <Button onClick={goPreviousForm} style={{ width: 150 }}>
                {current === 0 ? "Cancel" : "Back"}
              </Button>
              <Button
                onClick={goNextForm}
                type="primary"
                style={{ width: 150 }}
              >
                {current === 2 ? "Submit" : "Next"}
              </Button>
              <Button htmlType="submit" onClick={dateAndTimeChecker}>
                Submit
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </ContentContainer>
    </ConfigProvider>
  );
};

export default createEvent;

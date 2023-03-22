import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Steps, Button, Form, ConfigProvider, Typography } from "antd";
import styled from "styled-components";

import BasicsContent from "@/components/create-event/BasicsContent";
import LocationContent from "@/components/create-event/LocationContent";
import DescriptionContent from "@/components/create-event/DescriptionContent";
import theme from "@/utils/theme";
import SuccessContent from "@/components/create-event/SuccessContent";
import useEventStore from "@/hooks/useEventStore";
import dayjs from "dayjs";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.5vh 5vw;
`;

const ButtonContainer = styled.div`
  height: 32px;
  display: flex;
  gap: 70px;
  justify-content: center;
  width: 80%;

  ${theme.media.mobile} {
    gap: 40px;
  }
`;

const StyledForm = styled(Form)`
  min-height: 450;
  height: 90%;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${theme.media.mobile} {
    width: 80%;
  }
`;

const createEvent: React.FC<{}> = ({}) => {
  const [form] = Form.useForm();
  const { createEvent } = useEventStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const goNextForm = () => {
    if (currentPageIndex === 0) {
      const {
        requireParticipantsMin: minimum,
        requireParticipantsMax: maximum,
      } = form.getFieldsValue([
        "requireParticipantsMin",
        "requireParticipantsMax",
      ]);

      if (minimum === undefined) {
        form.setFieldValue("requireParticipantsMin", 1);
      }

      if (maximum === undefined) {
        form.setFieldValue("requireParticipantsMax", 1000);
      }

      if (maximum < minimum) {
        form.setFieldValue("requireParticipantsMin", maximum);
        form.setFieldValue("requireParticipantsMax", minimum);
      }
    }
    form
      .validateFields()
      .then(() => {
        setCurrentPageIndex(currentPageIndex + 1);
      })
      .catch();
  };

  const goPreviousForm = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onFinish = () => {
    const {
      eventName,
      eventType,
      visibility,
      tags,
      requireParticipantsMin,
      requireParticipantsMax,
      date,
      time,
      meetingType,
      location,
      website,
      picture,
      description,
    } = form.getFieldsValue(true);

    createEvent({
      eventName,
      eventType,
      visibility,
      tags,
      requireParticipantsMin,
      requireParticipantsMax,
      startDate: dayjs(date[0]).format("YYYY-MM-DD").toString(),
      endDate: dayjs(date[1]).format("YYYY-MM-DD").toString(),
      startTime: dayjs(time[0]).format("HH:mm").toString(),
      endTime: dayjs(time[1]).format("HH:mm").toString(),
      meetingType,
      location,
      website,
      pictures: [picture.file.thumbUrl],
      description,
    });

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
        <Typography.Title>Create Event</Typography.Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Steps
            current={currentPageIndex}
            items={[
              { title: "Basics" },
              { title: "Location" },
              { title: "Description" },
            ]}
            style={{ minWidth: "350px", width: "30vw", marginBottom: 20 }}
            labelPlacement="vertical"
            responsive={false}
          />
          {isSuccess ? (
            <SuccessContent />
          ) : (
            <StyledForm onFinish={onFinish} form={form}>
              {content[currentPageIndex]}
              <ButtonContainer>
                <BackButton />
                <NextButton />
              </ButtonContainer>
            </StyledForm>
          )}
        </div>
      </ContentContainer>
    </ConfigProvider>
  );
};

export default createEvent;

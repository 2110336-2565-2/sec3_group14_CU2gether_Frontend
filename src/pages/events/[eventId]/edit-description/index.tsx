import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Layout, Space, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import styled from "styled-components";
import events from "api/events";
import useEventStore from "@/hooks/useEventStore";

const { TextArea } = Input;

const TextAreaContainer = styled(Layout)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2.5vh;
  width: 100vw;
  ${theme.media.tablet} {
    font-size: 20px;
  }
  ${theme.media.mobile} {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2.5vh;
  gap: 2vw;
  width: 100%;
`;

const Description: React.FC<{}> = ({}) => {
  const { event, getEventDetail, updateEventDescription } = useEventStore();
  const [descriptionDetail, setDescriptionDetail] = useState({
    id: "0",
    description: "Tell us something",
  });

  const [form] = Form.useForm();
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      const getData = async (id: string) => {
        try {
          await getEventDetail(id);
        } catch (err) {
          console.log(err)
        }
      };
      getData(eventId.toString());
    }
  }, []);

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        description: event.description,
      });
    }
  }, [event]);

  const onDescriptionFinish = async (values: any) => {
    if (eventId) {
      const id = eventId.toString();
      const { description } = values;
      updateEventDescription(id, description);
    }
  };

  const handleSaveClick = () => [
    router.push(`/events/${eventId}/edit-main`)
  ]

  const handleCancelClick = () => {
    router.push(`/events/${eventId}/edit-main`);
  };

  const buttonForm = (
    <ButtonContainer>
      <Button
        type="default"
        htmlType="button"
        onClick={() => handleCancelClick()}
      >
        Cancel
      </Button>
      <Button
        type="primary" 
        htmlType="submit"
        onClick={() => handleSaveClick()}
      >
        Save
      </Button>
    </ButtonContainer>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <TextAreaContainer>
        <Form form={form} onFinish={onDescriptionFinish}>
          <Form.Item name="description">
            <TextArea
              style={{ width: "50vw", height: "60vh", margin: "auto" }}
            />
          </Form.Item>
          <Form.Item>{buttonForm}</Form.Item>
        </Form>
      </TextAreaContainer>
    </ConfigProvider>
  );
};

export default Description;
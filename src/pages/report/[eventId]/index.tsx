import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../../../public/background.svg";

import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Layout,
  ConfigProvider,
  Upload,
} from "antd";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import { useRouter } from "next/router";
import { EventType, Visibility, MeetingType, Event } from "@/types";
import EventDetail from "@/components/report/EventDetail";
import Image from "next/image";
import FormData from "form-data";
import useEventReportStore from "@/hooks/useEventReportStore";
import { CU_API } from "@/config";
const { Content } = Layout;
const { Title, Text } = Typography;

const typeList = [
  { value: "SCAMMING", label: "Scamming" },
  { value: "DRUGS", label: "Drugs" },
  { value: "UNAUTHORIZED_PUBLIC_RACING", label: "Unauthorized public racing" },
  { value: "PUBLIC_LEWD", label: "Public Lewd" },
  { value: "GAMBLING", label: "Gambling" },
  { value: "VIOLENCE", label: "Violence" },
  { value: "DANGER", label: "Danger" },
  { value: "FOOD_POISIONING", label: "Food poisioning" },
  { value: "OTHERS", label: "Others" },
];

const defaultEventDetail = {
  eventName: "No Event Name",
  eventType: EventType.OTHERS,
  visibility: Visibility.PRIVATE,
  tags: ["No Tag"],
  requireParticipantsMin: 1,
  requireParticipantsMax: 20,
  startDate: "2000-01-01",
  endDate: "2000-01-02",
  startTime: "08:00",
  endTime: "16:00",
  meetingType: MeetingType.ONSITE,
  location: "Chulalongkorn",
  website: "www.exmaple.com",
  pictures: [""],
  ownerName: "No Name",
};

const ReportMain: React.FC<{}> = ({}) => {
  const { event, getEventDetail, createEventReport } = useEventReportStore();
  const [eventDetail, setEventDetail] = useState<Event>(defaultEventDetail);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();
  const router = useRouter();
  const { eventId } = router.query;
  useEffect(() => {
    if (eventId) {
      console.log(eventId.toString());
      const getData = async (id: string) => {
        try {
          await getEventDetail(id);
        } catch (err) {
          console.log(err);
        }
      };
      getData(eventId.toString());
    }
  }, [eventId]);

  useEffect(() => {
    if (event) {
      setEventDetail(event);
      setImageUrl(CU_API + event.pictures[0].substring(2));
    }
  }, [event]);
  const onFormFinish = async () => {
    const data = new FormData();
    const { subject, description, problemType, attachments } =
      form.getFieldsValue(true);
    console.log(subject, description, problemType, attachments);
    /*Example
    attachments.fileList.forEach((picture: any) => {
      data.append("pictures", picture.originFileObj);
    });
    data.append("eventId", "1");
    await axios.post(CU_API + "events/uploadImage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
     */
    data.append("subject", subject);
    data.append("description", description);
    data.append("problemtype", problemType);
    if (attachments) {
      attachments.fileList.forEach((picture: any) => {
        data.append("pictures", picture.originFileObj);
      });
    }
    if (eventId) {
      data.append("eventId", eventId.toString());
    }
    //await createEventReport(data);
    console.log(data);
  };

  const handleReportHistoryClick = () => {
    router.push("/report/reporthistory");
  };

  const subjectForm = <Input placeholder="Subject" style={{ width: "80%" }} />;
  const typeForm = <Select options={typeList} style={{ width: "80%" }} />;
  const descriptionForm = (
    <Input.TextArea
      placeholder="Description"
      style={{
        height: "20vh",
        maxHeight: "100%",
        width: "100%",
        resize: "none",
      }}
    />
  );

  const attachmentsForm = (
    <Upload.Dragger style={{ width: "80%" }}>
      <p className="ant-upload-hint">Add files or drop files here</p>
    </Upload.Dragger>
  );

  const buttonForm = (
    <ButtonContainer>
      <ButtonConfig
        type="default"
        htmlType="button"
        onClick={() => handleReportHistoryClick()}
      >
        Report history
      </ButtonConfig>
      <ButtonConfig type="primary" htmlType="submit">
        Submit
      </ButtonConfig>
    </ButtonContainer>
  );
  const eventInfo = <EventDetail event={eventDetail} />;
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
      <ReportContainer>
        <HeaderContainer>
          <Title className="ant-typography-title">Report Event</Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            <LayoutContainer>
              <PictureContainer>
                <Image
                  loader={() => imageUrl}
                  src={imageUrl}
                  alt={"eventImage"}
                  fill
                  style={{ objectFit: "cover" }}
                  crossOrigin="anonymous"
                />
              </PictureContainer>
              <EventInfoContainer>{eventInfo}</EventInfoContainer>
              <FormInputContainer form={form} onFinish={onFormFinish}>
                <FormInput
                  title="Subject"
                  name="subject"
                  isRequired={true}
                  rules={[{ required: true, message: "Please enter Subject" }]}
                >
                  {subjectForm}
                </FormInput>
                <FormInput
                  title="ProblemType"
                  name="problemType"
                  isRequired={true}
                  rules={[
                    { required: true, message: "Please enter problemType" },
                  ]}
                >
                  {typeForm}
                </FormInput>
                <FormInput
                  title="Description"
                  name="description"
                  isRequired={true}
                  rules={[
                    { required: true, message: "Please enter description" },
                  ]}
                >
                  {descriptionForm}
                </FormInput>
                <FormInput title="Attachments" name="attachments">
                  {attachmentsForm}
                </FormInput>
                <Form.Item>{buttonForm}</Form.Item>
              </FormInputContainer>
            </LayoutContainer>
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ConfigProvider>
  );
};
const ReportContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  padding: 2.5vh 5vw;
  ${theme.media.tablet} {
    width: 90%;
  }
  ${theme.media.mobile} {
    width: 100%;
  }
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  font-size: 20px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: left;
  padding-top: 5vh;
`;

const LayoutContainer = styled(Layout)`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  align-content: start;
  width: 100%;
  column-gap: 0;
  ${theme.media.tablet} {
    grid-template-columns: repeat(3, auto);
  }
  ${theme.media.mobile} {
    grid-template-columns: repeat(3, auto);
  }
`;

const FormInputContainer = styled(Form)`
  grid-column-start: 2;
  grid-column-end: span 2;
  grid-row-start: 2;
  grid-row-end: span 2;
  align-items: center;
  justify-content: left;
  padding: 2.5vh;
  width: 100%;
  min-width: 350px;
  ${theme.media.tablet} {
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 2;
    grid-row-end: span 2;
  }
  ${theme.media.mobile} {
    min-width: 0px;
    width: 100%;
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 3;
    grid-row-end: span 2;
  }
`;

const EventInfoContainer = styled(Layout)`
  grid-column-start: 2;
  grid-column-end: span 2;
  grid-row-start: 1;
  grid-row-end: span 1;
  padding-left: 2.5vh;
  width: 100%;
  min-width: 400px;
  ${theme.media.tablet} {
    min-width: 200px;
  }

  ${theme.media.mobile} {
    min-width: 0;
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 2;
    grid-row-end: span 1;
  }
`;
const PictureContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: span 1;
  grid-row-start: 1;
  grid-row-end: span 2;
  width: max(30vh, 30vw);
  height: max(35vh, 35vw);
  max-height: 400px;
  max-width: 300px;
  position: relative;
  place-self: start;
  ${theme.media.tablet} {
    width: max(20vh, 20vw);
    height: max(30vh, 30vw);
    max-width: 150px;
    max-height: 200px;
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: span 1;
    place-self: center;
  }
  ${theme.media.mobile} {
    width: 20vh;
    height: 30vh;
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row-start: 1;
    grid-row-end: span 1;
    place-self: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  gap: 2vw;
  ${theme.media.tablet} {
    justify-content: center;
  }
`;

const ButtonConfig = styled(Button)`
  width: 180px;
`;
export default ReportMain;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../../public/background.svg";

import {
  Typography,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Layout,
  ConfigProvider,
  Space,
  Upload,
} from "antd";
import theme from "@/utils/theme";
import { FormInput } from "@/common/input";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { EventType, Visibility, MeetingType } from "@/types";
import EventDetail from "@/components/report/EventDetail";
import Image from "next/image";
const { Content } = Layout;
const { Title, Text } = Typography;

const typeList = [
  { value: "RESTAURANT", label: "Restaurant" },
  { value: "CAFE", label: "Cafe" },
  { value: "BAR", label: "Bar" },
  { value: "SPORT", label: "Sport" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "CONCERT", label: "Concert" },
  { value: "PHOTO_TRIP", label: "Photo Trip" },
  { value: "BOARDGAME", label: "Boardgame" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "SPECIAL_DAY", label: "Special Day" },
  { value: "OTHERS", label: "Others" },
];

const ReportContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  padding: 2.5vh 5vw;
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding-top: 40px;
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
  display: flex;
  flex-direction: row;
  grid-gap: 1rem;
  align-content: start;
  width: 100%;
  outline: 2px solid green;
  ${theme.media.tablet} {
    flex-direction: column;
  }
`;

const FormInputContainer = styled(Form)`
  align-items: center;
  justify-content: left;
  flex-direction: column;
  padding: 2.5vh;
  width: 100%;
  flex: 2;
`;

const EventInfoContainer = styled(Layout)`
  width: 100%;
  height: 100%;
  flex: 2;
`;
const PictureContainer = styled.div`
  width: 15vw;
  height: 40vh;
  position: relative;
`;
const EventAndFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  gap: 2vw;
`;

const ButtonConfig = styled(Button)`
  width: 180px;
`;

export type eventDetailParams = {
  id: string;
  eventName?: string;
  eventType?: EventType;
  visibility?: Visibility;
  tags?: string[];
  requireParticipantsMin?: number;
  requireParticipantsMax?: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  meetingType?: MeetingType;
  location?: string;
  website?: string;
};

const defaultEventDetail = {
  id: "0",
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
};

const EditEventMain: React.FC<{}> = ({}) => {
  const [eventDetail, setEventDetail] =
    useState<eventDetailParams>(defaultEventDetail);

  const [form] = Form.useForm();
  const router = useRouter();

  const onFormFinish = async (values: any) => {
    // const id = eventDetail.id;
    // const {
    //   eventName,
    //   eventType,
    //   visibility,
    //   tags,
    //   requireParticipants,
    //   date,
    //   time,
    //   meetingType,
    //   location,
    //   website,
    // } = values;
    // report.updateEventDetail(
    //   id,
    //   eventName,
    //   eventType,
    //   visibility,
    //   tags,
    //   requireParticipants[0],
    //   requireParticipants[1],
    //   date[0].format("YYYY-MM-DD"),
    //   date[1].format("YYYY-MM-DD"),
    //   time[0].format("HH:mm"),
    //   time[1].format("HH:mm"),
    //   meetingType,
    //   location,
    //   website
    // );
    console.log("hello");
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  const subjectForm = (
    <Input placeholder="Subject" defaultValue={""} style={{ width: "80%" }} />
  );
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
        onClick={() => handleCancelClick()}
      >
        Back
      </ButtonConfig>
      <ButtonConfig type="primary" htmlType="submit">
        Submit
      </ButtonConfig>
    </ButtonContainer>
  );

  ////

  const mockEvents = [
    {
      id: 1,
      eventName: "event1",
      ownerName: "OAT",
      eventType: "Concert",
      location: "402, Building 3, Faculty of Engineering",
      startDate: dayjs("2021-01-01"),
      endDate: dayjs("2021-01-01"),
      startTime: "10:00",
      endTime: "11:00",
      pictures: [`background`],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor nam maxime veritatis provident doloribus, incidunt quo aspernatur esse quae velit consectetur numquam amet exercitationem nihil optio laudantium porro minima voluptate.",
    },
    {
      eventName: "event2",
      ownerName: "OAT",
      eventType: "Concert",
      location: "402, Building 3, Faculty of Engineering",
      startDate: dayjs("2021-01-01"),
      endDate: dayjs("2021-01-01"),
      startTime: "10:00",
      endTime: "11:00",
      pictures: [""],
      description: "dsasdasdasdsads",
    },
  ];
  const { id, ...mockEvent } = mockEvents[0];

  const eventForm = <EventDetail displayEvent={mockEvent} />;
  ////
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
                <Image src={background} alt={"asdf"} fill objectFit="cover" />
              </PictureContainer>
              <EventAndFormContainer>
                <EventInfoContainer>{eventForm}</EventInfoContainer>
                <FormInputContainer form={form} onFinish={onFormFinish}>
                  <FormInput title="Subject" name="subject" isRequired={true}>
                    {subjectForm}
                  </FormInput>
                  <FormInput
                    title="ProblemType"
                    name="problemtype"
                    isRequired={true}
                  >
                    {typeForm}
                  </FormInput>
                  <FormInput
                    title="Description"
                    name="description"
                    isRequired={true}
                  >
                    {descriptionForm}
                  </FormInput>
                  <FormInput title="Attachments" name="attachments">
                    {attachmentsForm}
                  </FormInput>
                  <Form.Item>{buttonForm}</Form.Item>
                </FormInputContainer>
              </EventAndFormContainer>
            </LayoutContainer>
          </ContentContainer>
        </Content>
      </ReportContainer>
    </ConfigProvider>
  );
};

export default EditEventMain;

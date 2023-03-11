import axios from "axios";
import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";
import { Form, Input, Select, Radio, DatePicker, TimePicker, Button, Layout, ConfigProvider } from "antd";
import theme from "@/utils/theme";
import FormInput from "../basic-components/FormInput";
import { getEventByName } from "api";
import dayjs from 'dayjs';

const InputContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  background-color: ${theme.color.white};
`;

const FlexContainer = styled.div`
  display: flex;
  width: 400px;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const typeList = [
  { value: "No Type", label: "No Type"},
  { value: "Concert", label: "Concert" },
  { value: "Education", label: "Education" },
  { value: "Festival", label: "Festival" },
  { value: "Market", label: "Market" },
];

const tagList = [
  { value: "eiei1", label: "eiei1" },
  { value: "eiei2", label: "eiei2" },
  { value: "eiei3", label: "eiei3" },
  { value: "eiei4", label: "eiei4" },
];

const eventDetail = {
    eventName: String,
    eventType: String,
    visibility: Radio,
    tags: String,
    requireParticipantsMin: Number,
    requireParticipantsMax: Number,
    startDate: dayjs,
    endDate: dayjs,
    startTime: dayjs,
    endTime: dayjs,
    meetingType: Radio,
    location: String,
    website: String,
    description: String
}

const EditEvent: React.FC<{}> = ({}) => {
  const [eventDetail, setEventDetail] = useState({
    eventName: "No Event Name",
    eventType: "No Type",
    visibility: "public",
    tags: "Animal",
    requireParticipantsMin: 0,
    requireParticipantsMax: 127,
    startDate: "2023-03-02",
    endDate: "2023-03-03",
    startTime: "16:00:00",
    endTime: "22:00:00",
    meetingType: "onsite",
    location: "Somewhere On Earth",
    website: "www.exmaple.com",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    getEventByName('orange')
    .then((data) => {
      const newEvent = {
        eventName: data.name,
        eventType: "Concert",
        visibility: "public",
        tags: data.tag,
        requireParticipantsMin: data.minCap,
        requireParticipantsMax: data.maxCap,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: "16:00:00",
        endTime: "22:00:00",
        meetingType: "onsite",
        location: data.location,
        website: "www.exmaple.com",
      };
      setEventDetail(newEvent);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      "event-name": eventDetail.eventName,
      "event-type": eventDetail.eventType,
      "visibility": eventDetail.visibility,
      "tags": eventDetail.tags,
      "minimum": eventDetail.requireParticipantsMin,
      "maximum": eventDetail.requireParticipantsMax,
      // "start-date": eventDetail.startDate,
      // "end-date": eventDetail.endDate,
      // "start-time": eventDetail.startTime,
      // "end-time": eventDetail.endTime,
      "meeting-type": eventDetail.meetingType,
      "location": eventDetail.location,
      "website": eventDetail.website,
    })
  })

  const eventNameForm = (
    <Input 
    placeholder="Event Name" 
    defaultValue={eventDetail.eventName}
    value={eventDetail.eventName}
    />
  ); 

  const typeForm = (
    <Select
      defaultValue={eventDetail.eventType}
      options={typeList}
    />
  );

  const visibilityForm = (
    <Radio.Group defaultValue={eventDetail.visibility} buttonStyle="solid">
      <Radio.Button value="public" style={{ width: 200, textAlign: "center" }}>
        Public
      </Radio.Button>
      <Radio.Button value="private" style={{ width: 200, textAlign: "center" }}>
        Private
      </Radio.Button>
    </Radio.Group>
  );

  const tagsForm = (
    <Select
      mode="tags"
      placeholder="Tags"
      defaultValue={eventDetail.tags}
      value={eventDetail.tags}
      options={tagList}
    />      
  );

  const participantCountForm = (
    <FlexContainer>
      <FormInput title="Min" name="minimum" textWidth={40} inputWidth={140} marginBottom={0}>
        <Input placeholder="Min" style={{ width: 140}} defaultValue={eventDetail.requireParticipantsMin}/>
      </FormInput>

      <FormInput title="Max" name="maximum" textWidth={40} inputWidth={140} marginBottom={0}>
        <Input placeholder="Max" style={{ width: 140}} defaultValue={eventDetail.requireParticipantsMax}/>
      </FormInput>
    </FlexContainer>
  );

  const dateForm = (
    <FlexContainer>
      <FormInput title="Start" name="start-date" textWidth={40} inputWidth={140} marginBottom={0}>
        <DatePicker style={{ width: 140 }}/>
      </FormInput>

      <FormInput title="Stop" name="stop-date" textWidth={40} inputWidth={140} marginBottom={0}>
        <DatePicker style={{ width: 140 }}/>
      </FormInput>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <FormInput title="Start" name="start-time" textWidth={40} inputWidth={140} marginBottom={0}>
        <TimePicker style={{ width: 140 }}/>
      </FormInput>

      <FormInput title="Stop" name="stop-time" textWidth={40} inputWidth={140} marginBottom={0}>
        <TimePicker style={{ width: 140 }}/>
      </FormInput>
    </FlexContainer>
  );

  const meetingTypeForm = (
    <FlexContainer>
      <Radio.Group defaultValue={eventDetail.meetingType} buttonStyle="solid">
        <Radio.Button value="onsite" style={{ width: 200, textAlign: "center" }}>
          Onsite
        </Radio.Button>
        <Radio.Button value="online" style={{ width: 200, textAlign: "center" }}>
          Online
        </Radio.Button>
      </Radio.Group>      
    </FlexContainer>
  );

  const locationForm = (
    <Input placeholder="Location" defaultValue={eventDetail.location}/>
  );

  const websiteForm = (
    <Input placeholder="Website" defaultValue={eventDetail.website}/>
  );

  return (      
    <ConfigProvider      
    theme={{
      token: {
        colorPrimary: `${theme.color.cu_pink}`,
      },
    }}>
    <InputContainer>
      <Form form={form}>
        <FormInput title="Event Name" name="event-name" isRequired={false}>
          {eventNameForm}
        </FormInput>

        <FormInput title="Type" name="event-type" isRequired={false}>
          {typeForm}
        </FormInput>

        <FormInput title="Visibility" name="visibility" isRequired={false}>
          {visibilityForm}
        </FormInput>

        <FormInput title="Tags" name="tags">
          {tagsForm}
        </FormInput>

        <FormInput title="Required Number of Participants" name="participant-count" isRequired={false}>
          {participantCountForm}
        </FormInput>

        <FormInput title="Date" name="date" isRequired={false}>
          {dateForm}
        </FormInput>

        <FormInput title="Time" name="time" isRequired={false}>
          {timeForm}
        </FormInput>

        <FormInput title="Meeting Type" name="meeting-type" isRequired={false}>
          {meetingTypeForm}
        </FormInput>

        <FormInput title="Location" name="location" isRequired={false}>
          {locationForm}
        </FormInput>

        <FormInput title="Website" name="website">
          {websiteForm}
        </FormInput>

      </Form>
    </InputContainer>
    </ConfigProvider>
  );
};

export default EditEvent;
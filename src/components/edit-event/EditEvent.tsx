import axios from "axios";
import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";
import { Form, Input, Select, Radio, DatePicker, TimePicker, Button, Layout } from "antd";
import theme from "@/utils/theme";
import FormInput from "../basic-components/FormInput";
import { getEventByName } from "api";
import editEvent from "@/pages/editEvent";

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
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const eventTypeList = [
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
    visibility: String,
    tags: String,
    requireParticipantsMin: Number,
    requireParticipantsMax: Number,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    meetingType: String,
    location: String,
    website: String
}

const EditEvent: React.FC<{}> = ({}) => {
  const [eventDetail, setEventDetail] = useState({
    eventName: "Event Name",
    eventType: "Concert",
    visibility: "Public",
    tags: "Animal",
    requireParticipantsMin: 0,
    requireParticipantsMax: 127,
    startDate: "2023-03-02",
    endDate: "2023-03-03",
    startTime: "16:00:00",
    endTime: "22:00:00",
    meetingType: "Onsite",
    location: "Somewhere On Earth",
    website: "www.exmaple.com"
  });

  useEffect(() => {
    // getEventByName('Orangutan Show!')
    // .then((data) => {
    //   setEventDetail(data);
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }, []);
  
  const eventNameForm = (
    <FlexContainer>
      <Form.Item
        name="eventName"
        >
        <Input placeholder="Event Name" defaultValue={eventDetail.eventName}/>
      </Form.Item>
    </FlexContainer>
  ); 

  const typeForm = (
    <FlexContainer>
      <Select
        defaultValue={eventDetail.eventType}
        options={eventTypeList}
      />
    </FlexContainer>
  );

  const visibilityForm = (
    <FlexContainer>
      <Radio.Group defaultValue={eventDetail.visibility} buttonStyle="solid">
        <Radio.Button value="public">Public</Radio.Button>
        <Radio.Button value="private">Private</Radio.Button>
      </Radio.Group>
    </FlexContainer>

  );

  const tagsForm = (
    <FlexContainer>
      <Select
        mode="tags"
        placeholder="Tags"
        defaultValue={eventDetail.tags}
        options={tagList}
      />      
    </FlexContainer>

  );

  const participantCountForm = (
    <FlexContainer>
      <FormInput text="Minimum" name="minimum" textWidth={70} inputWidth={100}>
        <Input placeholder="Minimum" defaultValue={eventDetail.requireParticipantsMin}/>
      </FormInput>

      <FormInput text="Maximum" name="maximum" textWidth={70} inputWidth={100}>
        <Input placeholder="Maximum" defaultValue={eventDetail.requireParticipantsMax}/>
      </FormInput>
    </FlexContainer>
  );

  const dateForm = (
    <FlexContainer>
      <FormInput text="Start" name="start-date" textWidth={70} inputWidth={100}>
        <DatePicker />
      </FormInput>

      <FormInput text="Stop" name="stop-date" textWidth={70} inputWidth={100}>
        <DatePicker />
      </FormInput>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <FormInput text="Start" name="start-time" textWidth={70} inputWidth={100}>
        <TimePicker />
      </FormInput>

      <FormInput text="Stop" name="stop-time" textWidth={70} inputWidth={100}>
        <TimePicker />
      </FormInput>
    </FlexContainer>
  );

  const meetingTypeForm = (
    <FlexContainer>
      <Radio.Group defaultValue={eventDetail.meetingType} buttonStyle="solid">
        <Radio.Button value="onsite">Onsite</Radio.Button>
        <Radio.Button value="online">Online</Radio.Button>
      </Radio.Group>      
    </FlexContainer>
  );

  const locationForm = (
    <FlexContainer>
      <Input placeholder="Location" defaultValue={eventDetail.location}/>
    </FlexContainer>
  );

  const websiteForm = (
    <FlexContainer>
      <Input placeholder="Website" defaultValue={eventDetail.website}/>
    </FlexContainer>
  );

  return (      
    <InputContainer>
      <Form>
        <FormInput text="Event Name" name="event-name" isRequired={false}>
          {eventNameForm}
        </FormInput>

        <FormInput text="Type" name="type" isRequired={false}>
          {typeForm}
        </FormInput>

        <FormInput text="Visibility" name="visibility" isRequired={false}>
          {visibilityForm}
        </FormInput>

        <FormInput text="Tags" name="tags">
          {tagsForm}
        </FormInput>

        <FormInput
          text="Required Number of Participants"
          name="participant-count"
          isRequired={false}
        >
          {participantCountForm}
        </FormInput>

        <FormInput text="Date" name="date" isRequired={false}>
          {dateForm}
        </FormInput>

        <FormInput text="Time" name="time" isRequired={false}>
          {timeForm}
        </FormInput>

        <FormInput text="Meeting Type" name="locating-type" isRequired={false}>
          {meetingTypeForm}
        </FormInput>

        <FormInput text="Location" name="location" isRequired={false}>
          {locationForm}
        </FormInput>

        <FormInput text="Website" name="website">
          {websiteForm}
        </FormInput>

      </Form>
    </InputContainer>
  );
};

export default EditEvent;
import React from "react";
import styled from "styled-components";
import { Form, Input, Select, Radio, DatePicker, TimePicker } from "antd";

import FormInput from "../basic-components/FormInput";

const FlexContainer = styled.div`
  display: flex;
  width: 400px;
  gap: 20px;
`;

const BasicsForm: React.FC<{}> = ({}) => {
  const typeForm = (
    <Select
      defaultValue="eiei1"
      options={[
        { value: "eiei1", label: "eiei1" },
        { value: "eiei2", label: "eiei2" },
        { value: "eiei3", label: "eiei3" },
        { value: "eiei4", label: "eiei4" },
      ]}
    />
  );

  const visibilityForm = (
    <Radio.Group>
      <Radio.Button value="public">Public</Radio.Button>
      <Radio.Button value="private">Private</Radio.Button>
    </Radio.Group>
  );

  const tagsForm = (
    <Select
      mode="tags"
      placeholder="Tags"
      options={[
        { value: "eiei1", label: "eiei1" },
        { value: "eiei2", label: "eiei2" },
        { value: "eiei3", label: "eiei3" },
        { value: "eiei4", label: "eiei4" },
      ]}
    />
  );

  const participantCountForm = (
    <FlexContainer>
      <FormInput text="Minimum" name="minimum" textWidth={70} inputWidth={100}>
        <Input placeholder="Minimum" />
      </FormInput>

      <FormInput text="Maximum" name="maximum" textWidth={70} inputWidth={100}>
        <Input placeholder="Maximum" />
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

  return (
    <Form>
      <FormInput text="Event Name" name="event-name" isRequired={true}>
        <Input placeholder="Event Name" />
      </FormInput>

      <FormInput text="Type" name="type" isRequired={true}>
        {typeForm}
      </FormInput>

      <FormInput text="Visibility" name="visibility" isRequired={true}>
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

      <FormInput text="Date" name="date" isRequired={true}>
        {dateForm}
      </FormInput>

      <FormInput text="Time" name="time" isRequired={true}>
        {timeForm}
      </FormInput>
    </Form>
  );
};

export default BasicsForm;

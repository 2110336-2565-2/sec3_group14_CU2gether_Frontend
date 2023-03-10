import React from "react";
import styled from "styled-components";
import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Upload,
} from "antd";

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
    <Radio.Group buttonStyle="solid">
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
      <FormInput
        title="Min"
        name="minimum"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <Input placeholder="Minimum" style={{ width: 140 }} />
      </FormInput>

      <FormInput
        title="Max"
        name="maximum"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <Input placeholder="Maximum" style={{ width: 140 }} />
      </FormInput>
    </FlexContainer>
  );

  const formList = [
    {
      title: "Start",
      name: "start-date",
      textWidth: 40,
      inputWidth: 140,
      marginBottom: 0,
    },
    {
      title: "Stop",
      name: "stop-date",
      textWidth: 40,
      inputWidth: 140,
      marginBottom: 0,
    },
  ];

  const dateForm = (
    <FlexContainer>
      <FormInput
        title="Start"
        name="start-date"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <DatePicker placeholder="Start Date" style={{ width: 140 }} />
      </FormInput>

      <FormInput
        title="Stop"
        name="stop-date"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <DatePicker placeholder="End Date" style={{ width: 140 }} />
      </FormInput>
    </FlexContainer>
  );

  const timeForm = (
    <FlexContainer>
      <FormInput
        title="Start"
        name="start-time"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <TimePicker placeholder="Start Time" style={{ width: 140 }} />
      </FormInput>

      <FormInput
        title="Stop"
        name="stop-time"
        textWidth={40}
        inputWidth={140}
        marginBottom={0}
      >
        <TimePicker placeholder="End Time" style={{ width: 140 }} />
      </FormInput>
    </FlexContainer>
  );

  return (
    <>
      {/* <Form> */}
      <FormInput title="Event Name" name="event-name" isRequired={true}>
        <Input placeholder="Event Name" />
      </FormInput>

      <FormInput title="Type" name="type" isRequired={true}>
        {typeForm}
      </FormInput>

      <FormInput title="Date" name="date" isRequired={true}>
        {dateForm}
      </FormInput>

      <FormInput title="Time" name="time" isRequired={true}>
        {timeForm}
      </FormInput>

      <FormInput title="Visibility" name="visibility" isRequired={true}>
        {visibilityForm}
      </FormInput>

      <FormInput title="Tags" name="tags">
        {tagsForm}
      </FormInput>

      <FormInput
        title="Required Number of Participants"
        name="participant-count"
        isRequired={false}
      >
        {participantCountForm}
      </FormInput>
      {/* </Form> */}
    </>
  );
};

export default BasicsForm;

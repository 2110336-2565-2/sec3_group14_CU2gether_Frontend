import React from "react";
import styled from "styled-components";
import { Form, Input, Select, Radio, DatePicker } from "antd";

import FormInput from "../basic-components/FormInput";

const ContentContainer = styled.div`
  width: 715px;
  height: 539px;
`;

const ParticipantContainer = styled.div`
  display: flex;
  width: 400px;
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
    <ParticipantContainer>
      <FormInput text="Minimum" name="minimum" isRequired={false}>
        <Input placeholder="Minimum" style={{ width: 180 }} />
      </FormInput>

      <FormInput text="Maximum" name="maximum" isRequired={false}>
        <Input placeholder="Maximum" style={{ width: 180 }} />
      </FormInput>
    </ParticipantContainer>
  );

  const { RangePicker } = DatePicker;

  return (
    <ContentContainer>
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

        <FormInput text="Tags" name="tags" isRequired={false}>
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
          <RangePicker showTime />
        </FormInput>
      </Form>
    </ContentContainer>
  );
};

export default BasicsForm;

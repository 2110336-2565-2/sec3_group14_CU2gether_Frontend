import React from "react";
import styled from "styled-components";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Upload,
} from "antd";
import theme from "@/utils/theme";

import { FormInput } from "@/common/input";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 75%;

  ${theme.media.mobile} {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const BasicsForm: React.FC<{}> = ({}) => {
  const typeForm = (
    <Select
      options={[
        { value: "eiei1", label: "eiei1" },
        { value: "eiei2", label: "eiei2" },
        { value: "eiei3", label: "eiei3" },
        { value: "eiei4", label: "eiei4" },
      ]}
    />
  );

  const visibilityForm = (
    <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
      <Radio.Button
        value="public"
        style={{ width: "50%", textAlign: "center" }}
      >
        Public
      </Radio.Button>
      <Radio.Button
        value="private"
        style={{ width: "50%", textAlign: "center" }}
      >
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
      <FormInput title="Min" name="minimum">
        <InputNumber placeholder="Minimum" style={{ width: "100%" }} min={1} />
      </FormInput>

      <FormInput title="Max" name="maximum">
        <InputNumber placeholder="Maximum" style={{ width: "100%" }} min={1} />
      </FormInput>
    </FlexContainer>
  );

  return (
    <FormContainer>
      <FormInput
        title="Event Name"
        name="event-name"
        isRequired={true}
        errorMessage="Please enter event name"
      >
        <Input placeholder="Event Name" />
      </FormInput>

      <FormInput
        title="Type"
        name="type"
        isRequired={true}
        errorMessage="Please enter type"
      >
        {typeForm}
      </FormInput>

      <FormInput
        title="Date"
        name="date"
        isRequired={true}
        errorMessage="Please enter date"
      >
        <DatePicker.RangePicker style={{ width: "100%" }} />
      </FormInput>

      <FormInput
        title="Time"
        name="time"
        isRequired={true}
        errorMessage="Please enter time"
      >
        <TimePicker.RangePicker style={{ width: "100%" }} />
      </FormInput>

      <FormInput
        title="Visibility"
        name="visibility"
        isRequired={true}
        errorMessage="Please enter visibility"
      >
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
    </FormContainer>
  );
};

export default BasicsForm;

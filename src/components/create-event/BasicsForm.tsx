import React from "react";
import styled from "styled-components";
import {
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  TimePicker,
} from "antd";
import theme from "@/utils/theme";
import { Visibility } from "@/types"

import { FormInput } from "@/common/input";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;

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
  const typeForm = () => {
    return (
      <Select
        options={[
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
        ]}
      />
    );
  };

  const visibilityForm = () => {
    return (
      <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
        <Radio.Button
          value={Visibility.PUBLIC}
          style={{ width: "50%", textAlign: "center" }}
        >
          Public
        </Radio.Button>
        <Radio.Button
          value={Visibility.PRIVATE}
          style={{ width: "50%", textAlign: "center" }}
        >
          Private
        </Radio.Button>
      </Radio.Group>
    );
  };

  const tagsForm = () => {
    return (
      <Select
        mode="tags"
        placeholder="Tags"
        options={[{ value: "CU2GETHER", label: "CU2Gether" }]}
      />
    );
  };

  const participantCountForm = () => {
    return (
      <FlexContainer>
        <FormInput title="Min" name="requireParticipantsMin">
          <InputNumber
            placeholder="Min"
            style={{ width: "100%" }}
            min={1}
            max={1000}
          />
        </FormInput>

        <FormInput title="Max" name="requireParticipantsMax">
          <InputNumber
            placeholder="Max"
            style={{ width: "100%" }}
            min={1}
            max={1000}
          />
        </FormInput>
      </FlexContainer>
    );
  };

  return (
    <FormContainer>
      <FormInput
        title="Event Name"
        name="eventName"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Event Name" }]}
      >
        <Input placeholder="Event Name" />
      </FormInput>

      <FormInput
        title="Type"
        name="eventType"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Type" }]}
      >
        {typeForm()}
      </FormInput>

      <FormInput
        title="Date"
        name="date"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Date" }]}
      >
        <DatePicker.RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
      </FormInput>

      <FormInput
        title="Time"
        name="time"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Time" }]}
      >
        <TimePicker.RangePicker style={{ width: "100%" }} format="HH:mm" />
      </FormInput>

      <FormInput
        title="Visibility"
        name="visibility"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Visibility" }]}
      >
        {visibilityForm()}
      </FormInput>

      <FormInput title="Tags" name="tags">
        {tagsForm()}
      </FormInput>

      <FormInput
        title="Required Number of Participants"
        name="participant-count"
      >
        {participantCountForm()}
      </FormInput>
    </FormContainer>
  );
};

export default BasicsForm;

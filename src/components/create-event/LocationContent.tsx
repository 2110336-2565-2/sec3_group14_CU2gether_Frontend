import React from "react";
import { Form, Radio, Input } from "antd";
import styled from "styled-components";
import { FormInput } from "@/common/input";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400;
`;

const LocationContent: React.FC<{}> = ({}) => {
  const meetingForm = (
    <Radio.Group buttonStyle="solid">
      <Radio.Button value="online" style={{ width: 200, textAlign: "center" }}>
        Online
      </Radio.Button>
      <Radio.Button value="onsite" style={{ width: 200, textAlign: "center" }}>
        Onsite
      </Radio.Button>
    </Radio.Group>
  );
  return (
    <ContentContainer>
      <FormInput title="Type" name="meeting-type" isRequired={true}>
        {meetingForm}
      </FormInput>

      <FormInput title="Location" name="location" isRequired={true}>
        <Input placeholder="Location" />
      </FormInput>

      <FormInput title="Website" name="website">
        <Input placeholder="Website" />
      </FormInput>
    </ContentContainer>
  );
};

export default LocationContent;

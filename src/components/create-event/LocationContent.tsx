import React from "react";
import { Form, Radio, Input } from "antd";
import styled from "styled-components";
import { FormInput } from "@/common/input";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400;
  width: 80%;
`;

const LocationContent: React.FC<{}> = ({}) => {
  const meetingForm = (
    <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
      <Radio.Button
        value="ONLINE"
        style={{ width: "50%", textAlign: "center" }}
      >
        Online
      </Radio.Button>
      <Radio.Button
        value="ONSITE"
        style={{ width: "50%", textAlign: "center" }}
      >
        Onsite
      </Radio.Button>
    </Radio.Group>
  );
  return (
    <ContentContainer>
      <FormInput
        title="Type"
        name="meetingType"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Meeting Form" }]}
      >
        {meetingForm}
      </FormInput>

      <FormInput
        title="Location"
        name="location"
        isRequired={true}
        rules={[{ required: true, message: "Please enter Location" }]}
      >
        <Input placeholder="Location" />
      </FormInput>

      <FormInput title="Website" name="website">
        <Input placeholder="Website" />
      </FormInput>
    </ContentContainer>
  );
};

export default LocationContent;

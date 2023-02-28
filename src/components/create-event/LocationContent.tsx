import React from "react";
import { Form, Radio, Input } from "antd";
import styled from "styled-components";
import FormInput from "../basic-components/FormInput";

const LocationContent: React.FC<{}> = ({}) => {
  const meetingForm = (
    <Radio.Group>
      <Radio.Button value="online">Online</Radio.Button>
      <Radio.Button value="onsite">Onsite</Radio.Button>
    </Radio.Group>
  );
  return (
    <>
      <Form>
        <FormInput text="Type" name="meeting-type" isRequired={true}>
          {meetingForm}
        </FormInput>

        <FormInput text="Location" name="location" isRequired={true}>
          <Input placeholder="Location" />
        </FormInput>

        <FormInput text="Website" name="website">
          <Input placeholder="Website" />
        </FormInput>
      </Form>
    </>
  );
};

export default LocationContent;

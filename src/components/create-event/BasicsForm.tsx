import React from "react";
import styled from "styled-components";
import { Form, Input, Select, Radio, DatePicker } from "antd";

const ContentContainer = styled.div`
  height: 715px;
  width: 539px;
`;

const ParticipantContainer = styled.div`
  display: flex;
`;

const label = {
  labelCol: { span: 8 },
  wrapperCol: { span: 17 },
};

const BasicsForm: React.FC<{}> = ({}) => {
  return (
    <ContentContainer>
      <Form {...label}>
        <Form.Item
          name="event-name"
          label="Event Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select
            defaultValue="eiei1"
            options={[
              { value: "eiei1", label: "eiei1" },
              { value: "eiei2", label: "eiei2" },
              { value: "eiei3", label: "eiei3" },
              { value: "eiei4", label: "eiei4" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="visibility"
          label="Visibility"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio.Button value="public">Public</Radio.Button>
            <Radio.Button value="private">Private</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
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
        </Form.Item>

        <Form.Item
          name="participant-count"
          label="Required Number of Participants"
        >
          <ParticipantContainer>
            <Form.Item name="minimum" label="Minimum">
              <Input />
            </Form.Item>

            <Form.Item name="maximum" label="Maximum">
              <Input />
            </Form.Item>
          </ParticipantContainer>
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </ContentContainer>
  );
};

export default BasicsForm;

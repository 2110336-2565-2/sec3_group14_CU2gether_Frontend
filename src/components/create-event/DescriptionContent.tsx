import React from "react";
import { Input, Form } from "antd";

const DescriptionContent: React.FC<{}> = ({}) => {
  return (
    <>
      <Form.Item name="description">
        <Input.TextArea
          placeholder="Description"
          style={{ height: 400, width: 800, resize: "none" }}
        />
      </Form.Item>
    </>
  );
};

export default DescriptionContent;

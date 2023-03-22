import React from "react";
import { Input, Form } from "antd";

const DescriptionContent: React.FC<{}> = ({}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Form.Item name="description" style={{ height: "100%" }}>
        <Input.TextArea
          placeholder="Description"
          style={{
            height: "45vh",
            maxHeight: "100%",
            width: "100%",
            resize: "none",
          }}
        />
      </Form.Item>
    </div>
  );
};

export default DescriptionContent;

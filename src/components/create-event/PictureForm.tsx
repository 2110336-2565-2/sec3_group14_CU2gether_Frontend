import React, { useState } from "react";
import { Upload, Form } from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const PictureForm: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadButton = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>{isLoading ? <LoadingOutlined /> : <PictureOutlined />}</div>
      <div>Upload Event Photo</div>
    </div>
  );

  return (
    <>
      <Form.Item name="picture" rules={[{ required: true }]}>
        <Upload listType="picture-card">{uploadButton}</Upload>
      </Form.Item>
    </>
  );
};

export default PictureForm;

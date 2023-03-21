import React, { useEffect, useState } from "react";
import { Upload, Form, Image } from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import theme from "@/utils/theme";

const PictureForm: React.FC<{}> = ({}) => {
  const [url, setUrl] = useState<string>("");

  const ShowImage = () => {
    return url ? (
      <Image src={url} width="100%" preview={false} />
    ) : (
      <>
        <PictureOutlined style={{ fontSize: "3em" }} />
        <p>Upload Event Photo</p>
      </>
    );
  };

  return (
    <Form.Item
      name="picture"
      rules={[{ required: true, message: "Please insert picture" }]}
      style={{ width: "50%", height: "100%" }}
    >
      <Upload.Dragger
        maxCount={1}
        beforeUpload={(file: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          return false;
        }}
        onRemove={() => {
          setUrl("");
        }}
      >
        <ShowImage />
      </Upload.Dragger>
    </Form.Item>
  );
};

export default PictureForm;
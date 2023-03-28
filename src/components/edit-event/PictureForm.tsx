import React, { useEffect, useState } from "react";
import { Upload, Form, Image, FormInstance, UploadFile } from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import theme from "@/utils/theme";
import { Event } from "@/types";
import { CU_API } from "@/config";

const StyledForm = styled(Form.Item)`
  width: 30%;
  height: 100%;

  ${theme.media.mobile} {
    width: 100%;
  }
`;

const PictureForm: React.FC<{ event?: Event }> = ({ event }) => {
  const [url, setUrl] = useState<string>("");

  const ShowImage = () => {
    return url !== "" ? (
      <Image src={url} width="100%" preview={false} crossOrigin='anonymous' />
    ) : (
      <>
        <PictureOutlined style={{ fontSize: "3em" }} />
        <p>Upload Event Photo</p>
      </>
    );
  };

  const form = Form.useFormInstance();

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        "picture": setUrl(`${CU_API}${event.pictures[0].slice(2)}`),
      });
    }
  }, [event]);

  useEffect(() => {
    const formPicture = form.getFieldValue("picture");
    if (formPicture) {
      setUrl(formPicture.file.thumbUrl);
    }
  }, []);

  return (
    <StyledForm
      name="picture"
      rules={[{ required: true, message: "Please insert picture" }]}
    >
      <Upload.Dragger
        maxCount={1}
        beforeUpload={(file: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          // return false;
        }}
        onChange={({ file }) => {
          if (file.status === "done") {
            file.thumbUrl = url;
          }
        }}
        onRemove={() => {
          form.setFieldValue("picture", undefined);
          setUrl("");
        }}
      >
        <ShowImage />
      </Upload.Dragger>
    </StyledForm>
  );
};

export default PictureForm;
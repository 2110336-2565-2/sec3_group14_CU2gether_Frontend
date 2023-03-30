import React, { useState } from "react";
import CenteredModal from "@/common/modal";
import { useModal } from "@/hooks";
import { PictureOutlined } from '@ant-design/icons';
import { message, Upload, Image } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import useProfileStore from "@/hooks/useProfileStore";
import FormData from "form-data";


type UploadImageModalProps = {
  isModalOpen: boolean,
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ isModalOpen }) => {
  const { uploadImage } = useProfileStore();
  const formData: FormData = new FormData();
  const [imageUrl, setImageUrl] = useState<string>("");

  const ShowImage = () => {
    return imageUrl !== "" ? (
      <Image src={imageUrl} width="100%" preview={false} />
    ) : (
      <>
        <PictureOutlined style={{ fontSize: "3em" }} />
        <p>Upload Event Photo</p>
      </>
    );
  };

  const onFinish = async () => {

    // await formData.append("picture_url", imageUrl)

    console.log(formData)
    await uploadImage(formData);
  }

  return (
    <CenteredModal 
      open={isModalOpen}
      onOk={() => onFinish()}
      bodyStyle={{height: '70vh', paddingTop: '5vh'}}
    > 
      <Upload.Dragger
        maxCount = {1}
        beforeUpload={(file: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result as string);
          }
          reader.readAsDataURL(file);
        }}
        onChange={({ file }) => {
          if (file.status === "done") {
            file.thumbUrl = imageUrl;
            if(file.originFileObj) {
              // setImageUrl(file.originFileObj.name);
              formData.append("picture_url", file.originFileObj)
            }
            console.log(file.thumbUrl);
            console.log(file.originFileObj);
          }
        }}
        onRemove={() => setImageUrl("") }
      >
        <ShowImage/>
      </Upload.Dragger>
    </CenteredModal>
  );
};

export default UploadImageModal;

import React, { useEffect, useState } from "react";
import CenteredModal from "@/common/modal";
import { Form } from 'antd';
import useProfileStore from "@/hooks/useProfileStore";
import FormData from "form-data";
import PictureForm from "../create-event/PictureForm";
import { UPLOAD_MODE } from "@/types";
import { useRouter } from "next/router";
import styled from "styled-components";
import theme from "@/utils/theme";

const StyledForm = styled(Form)`
  width: 100%;
`;


type UploadImageModalProps = {
  isModalOpen: boolean,
  uploadMode: UPLOAD_MODE,
  closeModal:() => void,
};

const UploadImageModal: React.FC<UploadImageModalProps> = ({ isModalOpen, closeModal, uploadMode }) => {
  const { email, uploadImage, uploadCoverImage, checkStatus } = useProfileStore();
  const [ form ] = Form.useForm();

  const router = useRouter();

  useEffect(() => {
    checkStatus();
  }, []);

  const onFinish = async () => {
    const formData: FormData = new FormData();
    const { picture } = form.getFieldsValue(true);
    formData.append("email", email);
    formData.append("photo_url", picture.file.originFileObj);
    switch (uploadMode) {
      case UPLOAD_MODE.PROFILE:
        await uploadImage(formData);
        break;
      case UPLOAD_MODE.COVER:
        await uploadCoverImage(formData);
        break;
    }
    closeModal();
    router.reload();
  }

  return (
    <CenteredModal 
      open={isModalOpen}
      onOk={() => onFinish()}
      okText="Save"
      onCancel={() => {closeModal(); form.setFieldValue("picture", undefined);}}
      style={{width: '150vw'}}
      bodyStyle={{marginTop:'6vh', display: 'flex', alignItems: 'center'}}
    > 
      <StyledForm form={form}>
        <PictureForm uploadFor={uploadMode}/>
      </StyledForm>
    </CenteredModal>
  );
};

export default UploadImageModal;

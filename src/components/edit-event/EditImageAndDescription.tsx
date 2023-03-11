import React, { useState } from 'react';
import { useRouter } from "next/router";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Image, Layout, Button, Upload } from "antd";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import theme from "@/utils/theme";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const InputContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  background-color: ${theme.color.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 70%;
`

const ButtonConfig = styled(Button)`
    width: 180px;
    // height: 44px;
    // font-size: 20px;
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
`

const CancelEventTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;  
`
const CancelEventContent = styled.h2`
  font-size: 24px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditImage: React.FC<{}> = ({}) => {  
  const [onCancelEvent, setOnCancelEvent] = useState(false); 
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '0',
      name: 'poster.png',
      status: 'done',
      url: '/orangutan_show.png',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  setFileList(newFileList);

  const router = useRouter();

  const handleEditDescriptionClick = () => {
    router.push('/editEvent/description',undefined,{shallow:true});
  }

  const toggleCancelEventModal = () => {
    setOnCancelEvent(!onCancelEvent);
  };

  const title = (
    <CancelEventTitle>
      Want to cancel event?
    </CancelEventTitle>
  );

  const content = (
    <CancelEventContent>
      If you cancel this event, I will kill you!!!
    </CancelEventContent>
  );

  const renderButtonForm = (
    <ButtonContainer>
      <ButtonConfig 
      htmlType="button"
      onClick={toggleCancelEventModal}>
        Cancel Event
      </ButtonConfig>
      <Modal
      open={onCancelEvent}
      width={600}
      centered={true}
      closable={true}
      bodyStyle={{minHeight:500, marginTop: 40}}
      closeIcon={
        <FontAwesomeIcon
          onClick={toggleCancelEventModal}
          icon={faCircleXmark}
          size={"2x"}
        />
      }
      footer={null}
      title={title}>
        <ContentWrapper>
            {content}
        </ContentWrapper>
        <ModalButtonContainer>
          <ButtonConfig htmlType='button'>
            Cancel
          </ButtonConfig>
          <ButtonConfig htmlType='submit' type='primary'>
            Sure
          </ButtonConfig>
        </ModalButtonContainer>
      </Modal>
      <ButtonConfig 
      htmlType="button" 
      onClick={handleEditDescriptionClick} 
      type="primary">
        Edit Description
      </ButtonConfig>
    </ButtonContainer>
  );

  const editImageForm = (
    <Upload 
    listType="picture-card"
    fileList={fileList}
    onPreview={handlePreview}
    onChange={handleChange} 
    style={{alignItems:'center',justifyContent:'center',width:350, height:500}}>
    </Upload>  
  );

  const previewImageModal = (
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  );

  return (
    <InputContainer>
      {editImageForm}       
      {previewImageModal}
      {renderButtonForm}
    </InputContainer>
  );
}

export default EditImage;
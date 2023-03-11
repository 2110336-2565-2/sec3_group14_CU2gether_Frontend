import React, { useState} from 'react';
import { useRouter } from "next/router";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Image, Layout, Button, Upload } from "antd";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import theme from "@/utils/theme";
import styled from 'styled-components';

const InputContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  background-color: ${theme.color.white};
`;

const FlexContainer = styled.div`
  display: flex;
  width: 350px;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PosterContainer = styled.div`
//   width: 350px;
//   height: 500px;
`

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditImage: React.FC<{}> = ({}) => {    
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
  const buttonForm = (
    <ButtonContainer>
      <Button htmlType="button">Cancel Event</Button>
      <Button 
      htmlType="button" 
      onClick={handleEditDescriptionClick} 
      type="primary">
        Edit Description
      </Button>
    </ButtonContainer>
  );
  const uploadButton = (
    <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );  

  return (
    <InputContainer>
      <Upload 
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange} 
        style={{alignItems:'center',justifyContent:'center',width:350, height:500}}>
      </Upload>                
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {buttonForm}
    </InputContainer>
  );
}

export default EditImage;
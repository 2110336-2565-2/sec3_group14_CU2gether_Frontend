import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Layout, Space, ConfigProvider} from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import { getEventByName } from "api";
import FormInput from "@/components/basic-components/FormInput";

const { TextArea } = Input;
const { Content } = Layout;

const InputContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  background-color: ${theme.color.white};
`;

const TextAreaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 48px;
    background-color: ${theme.color.white};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
    gap: 20px;
`;

const deacriptionDetail = {
    description: String,
}

const Description: React.FC<{}> = ({}) => {
    const [descriptionDetail, setDescriptionDetail] = useState({
      description: "Tell us something"
    });

    const [form] = Form.useForm();

    useEffect(() => {
      getEventByName('orange')
      .then((data) => {
        setDescriptionDetail(data.description);
      })
      .catch((err) => {
        console.log(err)
      })
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            "description": descriptionDetail.description,
        })
    })

    const router = useRouter();
    const handleSaveClick = () => {
        // getEventByName(eventDetail);
        router.push('/editEvent', undefined, {shallow:true});
    };

    const handleCancelClick = () => {
        router.push('/editEvent');
    };

    const buttonForm = (
        <ButtonContainer>
            <Button htmlType="button" onClick={handleCancelClick}>Cancel</Button>
            <Button htmlType="submit" onClick={handleSaveClick} type="primary">Save</Button>
        </ButtonContainer>
    );

    return (
        <ConfigProvider      
        theme={{
          token: {
            colorPrimary: `${theme.color.primary}`,
          },
        }}>
        <TextAreaContainer>
            <Form form={form}>
                <TextArea
                name="description"
                defaultValue={descriptionDetail.description}
                value={descriptionDetail.description}
                style={{width:1000, height:754, margin:'auto'}}
                />    
            </Form>
        </TextAreaContainer>
        {buttonForm}     
        </ConfigProvider>

    );
};

export default Description;
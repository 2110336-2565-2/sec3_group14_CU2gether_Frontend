import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Layout, Space, ConfigProvider} from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import { getEventByName, updateEventDescription } from "api";
import FormInput from "@/components/basic-components/FormInput";

const { TextArea } = Input;
const { Content } = Layout;

const TextAreaContainer = styled(Layout)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 48px;
    width: 100vw;
    background-color: ${theme.color.white};
    ${theme.media.tablet} {
        font-size: 20px;
    }
    ${theme.media.mobile} {
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
    gap: 2vw;
`;

const ButtonConfig = styled(Button)`
    width: 180px;
    // height: 44px;
    // font-size: 20px;
`;

const Description: React.FC<{}> = ({}) => {
    const [descriptionDetail, setDescriptionDetail] = useState({
        eventName: "Event Name",
        description: "Tell us something",
    });

    const [form] = Form.useForm();

    useEffect(() => {
      getEventByName('orange')
      .then((data) => {
        const newDescription = {
            eventName: data.name,
            description: data.description,
        }
        setDescriptionDetail(newDescription);
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
        updateEventDescription(descriptionDetail.eventName, descriptionDetail.description)
        router.push('/editEvent');
    };

    const handleCancelClick = () => {
        router.push('/editEvent');
    };

    return (
        <ConfigProvider      
        theme={{
          token: {
            colorPrimary: `${theme.color.primary}`,
          },
        }}>
        <TextAreaContainer>
            <Form form={form}>
                <Form.Item name="description" >
                    <TextArea
                    defaultValue={descriptionDetail.description}
                    value={descriptionDetail.description}
                    style={{width:'50vw', height:'60vh', margin:'auto'}}
                    /> 
                </Form.Item>   
            </Form>
        </TextAreaContainer>
        <ButtonContainer>
            <ButtonConfig htmlType="button" onClick={handleCancelClick}>Cancel</ButtonConfig>
            <ButtonConfig htmlType="submit" onClick={handleSaveClick} type="primary">Save</ButtonConfig>
        </ButtonContainer>     
        </ConfigProvider>

    );
};

export default Description;
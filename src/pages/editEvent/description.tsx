import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Layout, Space, ConfigProvider} from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import { getEventByName, updateEventDescription } from "api/event";

const { TextArea } = Input;

const TextAreaContainer = styled(Layout)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2.5vh;
    width: 100vw;
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
    padding-top: 2.5vh;
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
    const router = useRouter();

    useEffect(() => {
      getEventByName('orange2')
      .then((data) => {
        const newDescription = {
            eventName: data.eventName,
            description: data.description,
        }
        setDescriptionDetail(newDescription);
      })
      .catch((err) => {
        console.log(err)
      })
    }, [router]);

    useEffect(() => {
        form.setFieldsValue({
            "eventName": descriptionDetail.eventName,
            "description": descriptionDetail.description,
        })
    })

    const onDescriptionFinish = async (values: any) => {
        console.log(values);
        const eventName = descriptionDetail.eventName;
        const { description } = values;
        updateEventDescription(eventName, description);
        router.push('/editEvent');
      }

    const handleCancelClick = () => {
        router.push('/editEvent');
    };

    const buttonForm = (
        <ButtonContainer>
            <ButtonConfig type="default" htmlType="button" onClick={() => handleCancelClick()}>
              Cancel
            </ButtonConfig>
            <ButtonConfig type="primary" htmlType="submit" >
              Save
            </ButtonConfig>
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
            <Form form={form} onFinish={onDescriptionFinish}>
                <Form.Item name="description" >
                    <TextArea
                    style={{width:'50vw', height:'60vh', margin:'auto'}}
                    /> 
                </Form.Item>
                <Form.Item>
                    {buttonForm}    
                </Form.Item>          
            </Form>
        </TextAreaContainer>
   
        </ConfigProvider>

    );
};

export default Description;
import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Layout, Space, ConfigProvider} from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import events from "api/events";

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
        id: "0",
        description: "Tell us something",
    });

    const [form] = Form.useForm();
    const router = useRouter();
    const { eventId } = router.query;

    useEffect(() => {
      if (eventId) {
        events.getEventByID(eventId.toString())
        .then((data) => {
          const newDescription = {
              id: data.id,
              description: data.description,
          }
          setDescriptionDetail(newDescription);
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            "id": descriptionDetail.id,
            "description": descriptionDetail.description,
        })
    })

    const onDescriptionFinish = async (values: any) => {
        console.log(values);
        const id = descriptionDetail.id;
        const { description } = values;
        events.updateEventDescription(id, description);
        router.push(`/events/${eventId}/edit-main`);
      }

    const handleCancelClick = () => {
        router.push(`/events/${eventId}/edit-main`);
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
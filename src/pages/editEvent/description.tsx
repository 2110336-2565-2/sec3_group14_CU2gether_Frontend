import React, { useState } from "react";
import { Input } from "antd";
import { useRouter } from "next/router";
import { Button, Layout, Space } from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import { TextAreaProps } from "antd/es/input";
import { TextAreaRef } from "antd/es/input/TextArea";

const { TextArea } = Input;
const { Content } = Layout;

type FormData = {
    description: string;
}

const TextAreaContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 48px;
  background-color: ${theme.color.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  gap: 20px;
`;

const Description: React.FC<FormData> = ({description}) => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({description:''});

    const handleSaveClick = () => {
        router.push('/editEvent', undefined, {shallow:true});
    };

    const handleCancelClick = () => {
        setFormData({description:''})
        router.back();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const buttonForm = (
        <ButtonContainer>
            <Button htmlType="button" onClick={handleCancelClick}>Cancel</Button>
            <Button htmlType="submit" onClick={handleSaveClick}>Save</Button>
        </ButtonContainer>
    );

    return (
        <>
            <TextAreaContainer>
                <TextArea 
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{width:1000, height:754, margin:'auto'}}
                />
            </TextAreaContainer>
            <ButtonContainer>
                {buttonForm}
            </ButtonContainer>        
        </>

    );
};

export default Description;
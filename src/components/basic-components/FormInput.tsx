import React from "react";
import { Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const ComponentsContainer = styled.div`
  display: flex;
`;

const TextBox = styled.p`
  font-weight: bold;
`;

type formInputProps = {
  text: string;
  isRequired: boolean;
  form: React.FC;
};

const FormInput: React.FC<formInputProps> = ({ text, isRequired, form }) => {
  return (
    <ComponentsContainer>
      <TextBox>
        {text}{" "}
        {isRequired ? <span style={{ color: theme.color.red }}>*</span> : ""}
      </TextBox>
    </ComponentsContainer>
  );
};

export default FormInput;

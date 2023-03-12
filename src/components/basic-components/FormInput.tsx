import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const TextBox = styled.div<{ width: number }>`
  font-weight: bold;
  font-size: 0.9rem;
  word-wrap: break-word;
  width: ${(props) => props.width}px;
  margin-right: 10px;
`;

type FormInputProps = {
  title: string;
  name: string;
  isRequired?: boolean;
  textWidth?: number;
  inputWidth?: number;
  isSubForm?: boolean;
  errorMessage?: string;
  children: JSX.Element;
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  name,
  isRequired = false,
  textWidth = 200,
  inputWidth = 400,
  isSubForm = true,
  errorMessage = "Please enter information",
  children,
}) => {
  const marginBottom: number = isSubForm ? 24 : 0;
  return (
    <>
      <Row>
        <Col>
          <TextBox width={textWidth}>
            {title}{" "}
            {isRequired ? (
              <span style={{ color: theme.color.red }}>*</span>
            ) : (
              ""
            )}
          </TextBox>
        </Col>

        <Col>
          <Form.Item
            style={{ width: inputWidth, marginBottom: marginBottom }}
            name={name}
            rules={[{ required: isRequired, message: errorMessage }]}
          >
            {children}
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormInput;

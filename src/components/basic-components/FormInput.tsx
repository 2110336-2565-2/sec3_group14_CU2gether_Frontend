import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const TextBox = styled.div<{ width: number }>`
  font-weight: bold;
  word-wrap: break-word;
  width: ${(props) => props.width}px;
  margin-right: 10px;
`;

interface FormInputProps {
  text: string;
  name: string;
  isRequired?: boolean;
  textWidth?: number;
  inputWidth?: number;
  children: JSX.Element;
}

const FormInput: React.FC<FormInputProps> = ({
  text,
  name,
  isRequired = false,
  textWidth = 200,
  inputWidth = 500,
  children,
}) => {
  return (
    <>
      <Row align="middle">
        <Col>
          <TextBox width={textWidth}>
            {text}{" "}
            {isRequired ? (
              <span style={{ color: theme.color.red }}>*</span>
            ) : (
              ""
            )}
          </TextBox>
        </Col>

        <Col>
          <Form.Item
            style={{ marginBottom: 0, width: inputWidth }}
            name={name}
            rules={[{ required: isRequired }]}
          >
            {children}
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormInput;
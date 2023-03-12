import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const TextBox = styled.div<{ width: number | string; fontSize: number }>`
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
  textWidth?: number | string;
  inputWidth?: number;
  isSubForm?: boolean;
  errorMessage?: string;
  fontSize?: number;
  children: JSX.Element;
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  name,
  isRequired = false,
  textWidth = "100%",
  inputWidth = "100%",
  isSubForm = true,
  errorMessage = "Please enter information",
  fontSize = 14,
  children,
}) => {
  const marginBottom: number = isSubForm ? 24 : 0;
  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col style={{ width: "24%" }}>
          <TextBox width={textWidth} fontSize={fontSize}>
            {title}{" "}
            {isRequired ? (
              <span style={{ color: theme.color.red }}>*</span>
            ) : (
              ""
            )}
          </TextBox>
        </Col>

        <Col style={{ width: "76%" }}>
          <Form.Item
            style={{
              minWidth: 100,
              width: inputWidth,
              marginBottom: marginBottom,
            }}
            name={name}
            rules={[{ required: isRequired, message: errorMessage }]}
          >
            {children}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default FormInput;

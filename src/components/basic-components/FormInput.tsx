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

type FormInputProps = {
  title: string;
  name: string;
  isRequired?: boolean;
  textWidth?: number;
  inputWidth?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  children: JSX.Element;
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  name,
  isRequired = false,
  textWidth = 200,
  inputWidth = 400,
  marginTop = 0,
  marginBottom = 20,
  marginLeft = 0,
  marginRight = 0,
  children,
}) => {
  // console.log(textWidth, inputWidth);
  return (
    <>
      <Row
        align="middle"
        style={{
          margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        }}
      >
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
import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const TextBox = styled.div<{ width: number | string; fontSize: number }>`
  font-weight: bold;
  font-size: 0.9rem;
  word-wrap: break-word;
  width: ${(props) => props.width};
  margin-right: 10px;

  ${theme.media.mobile} {
    font-size: 0.7rem;
    min-width: 100px;
  }
`;

type FormInputProps = {
  title: string;
  name: string;
  isRequired?: boolean;
  textWidth?: number | string;
  inputWidth?: number;
  children: JSX.Element;
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  name,
  isRequired = false,
  textWidth = 200,
  inputWidth = 500,
  children,
}) => {
  console.log(textWidth, inputWidth);
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

        <Col style={{ width: "76%" }}>
          <Form.Item
            style={{
              minWidth: 100,
              maxWidth: 400,
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
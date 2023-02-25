import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";

const TextBox = styled.div`
  font-weight: bold;
  word-wrap: break-word;
  width: 100px;
  margin-right: 10px;
`;

type formInputProps = {
  text: string;
  name: string;
  isRequired: boolean;
  DataForm: JSX.Element;
};

const FormInput: React.FC<formInputProps> = ({
  text,
  name,
  isRequired,
  DataForm,
}) => {
  return (
    <>
      <Row align="middle">
        <Col>
          <TextBox>
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
            style={{ marginBottom: 0 }}
            name={name}
            rules={[{ required: isRequired }]}
          >
            {DataForm}
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormInput;

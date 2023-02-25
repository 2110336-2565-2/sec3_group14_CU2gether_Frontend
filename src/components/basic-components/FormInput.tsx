import React from "react";
import { Row, Col } from "antd";
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
  isRequired: boolean;
  DataForm: React.FC;
};

const FormInput: React.FC<formInputProps> = ({
  text,
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
          <DataForm />
        </Col>
      </Row>
    </>
  );
};

export default FormInput;

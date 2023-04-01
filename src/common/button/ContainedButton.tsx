import { Button as AntdButton } from "antd";
import React from "react";
import styled from "styled-components";

type ContainedButtonProps = any;

const ContainedButton: React.FC<ContainedButtonProps> = (props: any) => {
  const { text, big, ...otherProps } = props;

  return (
    <>
      {big ? (
        <BigButton type="primary" {...otherProps}>
          {text}
        </BigButton>
      ) : (
        <Button type="primary" {...otherProps}>
          {text}
        </Button>
      )}
    </>
  );
};

const Button = styled(AntdButton)`
  border-radius: 8px !important;
`;

const BigButton = styled(AntdButton)`
  border-radius: 8px !important;
  font-size: 24px;
  height: fit-content;
`;

export default ContainedButton;

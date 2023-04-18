import theme from "@/utils/theme";
import { Button as AntdButton } from "antd";
import React from "react";
import styled from "styled-components";

type ContainedButtonProps = any;

const ContainedButton: React.FC<ContainedButtonProps> = (props: any) => {
  const { text, ...otherProps } = props;

  return (
    <Button type="primary" {...otherProps}>
      {text}
    </Button>
  );
};

const Button = styled(AntdButton)`
  border-radius: 8px !important;
  height: fit-content;
  ${theme.media.mobile} {
    font-size: 10px;
  }
`;

export default ContainedButton;

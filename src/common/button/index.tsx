import { Button } from "antd";
import React from "react";
import styled from "styled-components";

export const ContainedButton = (props: any) => {
  const { text, ...otherProps } = props;

  return (
    <Button type="primary" {...otherProps}>
      {text}
    </Button>
  );
};

export const OutlinedButton = (props: any) => {
  const { text, ...otherProps } = props;

  return <Button {...otherProps}>{text}</Button>;
};

export default ContainedButton;

import React from "react";
import { Button, Dropdown, DropdownProps, MenuProps } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

type DropdownButtonProps = {
  text: string;
  width: string | number;
};

const DropdownButton: React.FC<DropdownButtonProps & DropdownProps> = (
  props
) => {
  const { text, width, ...otherProps } = props;
  return (
    <Dropdown {...otherProps}>
      <Button style={{ width: width }}>
        <TextWithIcon>
          <>
            {text}
            <ExpandMoreIcon />
          </>
        </TextWithIcon>
      </Button>
    </Dropdown>
  );
};

const TextWithIcon = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

export default DropdownButton;

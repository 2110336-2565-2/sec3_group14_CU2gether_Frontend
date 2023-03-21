import React from "react";
import { Button, Dropdown } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

type DropdownButtonProps = {
  text: string;
  width: string | number;
  dropdownComponent: React.ReactNode;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  text,
  width,
  dropdownComponent,
}) => {
  return (
    <Dropdown dropdownRender={() => dropdownComponent}>
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

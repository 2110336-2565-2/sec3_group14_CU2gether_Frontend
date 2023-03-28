import React from "react";
import styled from "styled-components";

import theme from "@/utils/theme";
import BasicsForm from "./BasicsForm";
import PictureForm from "./PictureForm";
import { Form } from "antd";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90%;
  width: 100%;
  gap: 20px;

  ${theme.media.mobile} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 5px;
  }
`;

const BasicsContent: React.FC<{}> = ({}) => {
  return (
    <ContentContainer>
      <PictureForm />
      <BasicsForm />
    </ContentContainer>
  );
};

export default BasicsContent;

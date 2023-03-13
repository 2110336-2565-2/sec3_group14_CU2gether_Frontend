import React from "react";
import styled from "styled-components";

import BasicsForm from "./BasicsForm";
import PictureForm from "./PictureForm";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 65%;
  width: 100%;
  gap: 30px;
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

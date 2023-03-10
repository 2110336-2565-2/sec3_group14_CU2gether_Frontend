import React from "react";
import styled from "styled-components";

import BasicsForm from "./BasicsForm";
import PictureForm from "./PictureForm";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400;
`;

const BasicsContent: React.FC<{}> = ({}) => {
  return (
    <ContentContainer>
      <BasicsForm />
      {/* <PictureForm /> */}
    </ContentContainer>
  );
};

export default BasicsContent;

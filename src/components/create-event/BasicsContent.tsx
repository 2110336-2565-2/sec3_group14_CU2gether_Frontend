import React from "react";
import styled from "styled-components";

import BasicsForm from "./BasicsForm";

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: #bababa;
  border-width: 10px;
  border-style: solid;
`;

const BasicsContent: React.FC<{}> = ({}) => {
  return (
    <ContentContainer>
      <BasicsForm />
    </ContentContainer>
  );
};

export default BasicsContent;

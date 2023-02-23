import styled from "styled-components";
import React from "react";
import theme from "@/utils/theme";

const ContentContainer = styled.div`
  width: 100%;
  height: 967px;
  color: ${theme.color.white};
  margin: 0;
  padding: 0;
  height: 819px;
`;

const Text = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 100px;
  font-size: 96px;
  ${theme.media.mobile} {
    font-size: 40px;
  }
`;

const PicContent = styled.div`
  height: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Img = styled.img`
  max-width: 450px;
  height: 500px;
  border-radius: 60px;
`;

const Butcon = styled.div`
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;

const Content: React.FC = () => {
  return (
    <ContentContainer>
      <Text>
        <b>Want events?</b>
      </Text>
      {/* <ButContent>
            <ButonJoinLog/>
        </ButContent> */}
      {/* <PicContent>
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
            <Img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbCUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
        </PicContent> */}
    </ContentContainer>
  );
};

export default Content;

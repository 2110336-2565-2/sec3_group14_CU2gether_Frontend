import React from "react";
import { Form, Radio, Button, ConfigProvider, Layout, Space } from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';

import EditEvent from "@/components/edit-event/EditEventForm";

const { Content } = Layout;

const EditEventContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
  padding-bottom: 40px;
  background-color: ${theme.color.white};
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  font-size: 20px;
  background-color: ${theme.color.white};
  ${theme.media.mobile} {
    font-size: 14px;
  }
`;

const Header = styled.h1`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  justify-content: left;
  padding-top: 40px;
  ${theme.media.tablet} {
    font-size: 24px;
  }
  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const editEvent: React.FC<{}> = ({}) => {

  return (
      <EditEventContainer >
          <Header>
            Edit Event Detail
          </Header>
          <Content>
            <ContentContainer>
              <EditEvent />
            </ContentContainer>
          </Content>    
      </EditEventContainer>
  );
};

export default editEvent;
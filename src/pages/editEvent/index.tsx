import React from "react";
import { Layout, Typography } from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';

import EditEvent from "@/components/edit-event/EditEventForm";

const { Content } = Layout;
const { Title, Text } = Typography;

const EditEventContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  padding: 2.5vh 5vw;
  
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
`;

const HeaderContainer = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: left;
  padding-top: 5vh;
`;

const editEvent: React.FC<{}> = ({}) => {

  return (
      <EditEventContainer >
        <HeaderContainer>
          <Title className="ant-typography-title">
            Edit Event Detail
          </Title>
        </HeaderContainer>
        <Content>
          <ContentContainer>
            <EditEvent />
          </ContentContainer>
        </Content>    
      </EditEventContainer>
  );
};

export default editEvent;
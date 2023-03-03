import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Layout, Space } from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import posterImage from '../../orangutan_show.png'

import EditImage from "@/components/edit-event/EditImage";
import EditEvent from "@/components/edit-event/EditEvent";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  height: 119,
  lineHeight: '119px',
  backgroundColor: `${theme.color.white}`,
}

const EditEventContainer = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  width: 1158px;
  background-color: ${theme.color.white};
`;

const ContentContainer = styled(Content)`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${theme.color.white};
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Li = styled.li`
  display: flex;
  font-size: 40px;
  justify-content: left;
  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const editEvent: React.FC<{}> = ({}) => {
  const buttonForm = (
    <ButtonContainer>
        <Button htmlType="button">Cancel</Button>
        <Button htmlType="submit">Submit</Button>
    </ButtonContainer>
  );
  
  return (
    <EditEventContainer>
        <Li>
          <b>Edit Event Detail</b>
        </Li>
        <Content>
          <ContentContainer>
            <EditImage />
            <EditEvent />
          </ContentContainer>
        </Content>
        <Content>
          {buttonForm}
        </Content>
    </EditEventContainer>
  );
};

export default editEvent;
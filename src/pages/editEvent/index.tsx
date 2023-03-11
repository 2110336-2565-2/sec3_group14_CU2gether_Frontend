import React, { useState, useEffect, Children } from "react";
import { useRouter } from "next/router";
import { Form, Radio, Button, ConfigProvider, Layout, Space } from "antd";
import theme from "@/utils/theme";
import styled from 'styled-components';
import { getEventByName, updateEventDetail } from "api";
import dayjs from 'dayjs';

import EditImage from "@/components/edit-event/EditImageAndDescription";
import EditEvent from "@/components/edit-event/EditEventForm";

const { Content } = Layout;

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

const Li = styled.li`
  display: flex;
  font-size: 40px;
  justify-content: left;
  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const editEvent: React.FC<{}> = ({}) => {

  return (
    <ConfigProvider    
    theme={{
      token: {
        colorPrimary: `${theme.color.primary}`,
      },
    }}>
      <EditEventContainer >
          <Li>
            <b>Edit Event Detail</b>
          </Li>
          <Content>
            <ContentContainer>
              <EditImage />
              <EditEvent />
            </ContentContainer>
          </Content>    
      </EditEventContainer>
    </ConfigProvider>
  );
};

export default editEvent;
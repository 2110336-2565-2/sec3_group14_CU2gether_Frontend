import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import {QuestionOutlined,LoginOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import theme from '@/utils/theme';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <b>
            <div style={{fontSize:'17px',height:'30px'}}>
                <QuestionOutlined /> <Space/>
                Support
            </div> 
       </b>
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        <b>
            <div style={{fontSize:'17px',height:'30px'}}>
                <LoginOutlined /> <Space/><Space/>
                Login
            </div>
        </b>
      </a>
    ),
  }
];

const Con = styled.div`
  padding: 40px;
  ${theme.media.mobile} {
      padding: 20px;
  }
`

const Img =styled.div`
    background-image: url('profile.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 70px;
    height: 70px;
    ${theme.media.mobile} {
        width: 35px;
        height: 35px;
  }
`

export default function Dropd() {
  return (
    <Con>
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} overlayStyle={{width:'340px'}} >
                    <Img/>
                </Dropdown>
            </Space>
        </Space>
    </Con>
  )
}

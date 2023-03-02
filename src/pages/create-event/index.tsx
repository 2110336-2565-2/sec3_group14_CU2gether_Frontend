import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Steps, Button, Form, ConfigProvider } from "antd";
import styled from "styled-components";

import BasicsContent from "@/components/create-event/BasicsContent";
import LocationContent from "@/components/create-event/LocationContent";
import DescriptionContent from "@/components/create-event/DescriptionContent";
import theme from "@/utils/theme";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 70px;
  justify-content: center;
`;

const createEvent: React.FC<{}> = ({}) => {
  const [current, useCurrent] = useState(0);

  const clickclick = () => {
    useCurrent(current + 1);
  };
  const click = () => {
    useCurrent(current - 1);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const content = [
    <BasicsContent />,
    <LocationContent />,
    <DescriptionContent />,
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.cu_pink}`,
        },
        // components: {
        //   Button: {
        //     colorPrimary: `${theme.color.primary}`,
        //   },
        // },
      }}
    >
      <ContentContainer>
        <Steps
          current={current}
          items={[
            { title: "Basics" },
            { title: "Location" },
            { title: "Description" },
          ]}
          style={{ width: 400 }}
          labelPlacement="vertical"
        />
        <Form
          onFinish={onFinish}
          style={{
            height: 450,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {content[current]}
          <ButtonContainer>
            <Button onClick={click} style={{ width: 150 }}>
              {current === 0 ? "Cancel" : "Back"}
            </Button>
            <Button onClick={clickclick} type="primary" style={{ width: 150 }}>
              {current === 2 ? "Submit" : "Next"}
            </Button>
          </ButtonContainer>
        </Form>
      </ContentContainer>
    </ConfigProvider>
  );
};

export default createEvent;

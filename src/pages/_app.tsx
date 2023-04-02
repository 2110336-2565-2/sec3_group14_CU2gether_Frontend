import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ConfigProvider, Layout, notification } from "antd";
import theme from "@/utils/theme";
import Navbar from "@/components/navbar";
import styled from "styled-components";
config.autoAddCss = false;

const { Content } = Layout;
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    notification.config({
      duration: 2,
      placement: "top",
    });
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <MyLayout>
        <Navbar />
        <MyContent>
          <Component {...pageProps} />
        </MyContent>
      </MyLayout>
    </ConfigProvider>
  );
}

const MyLayout = styled(Layout)`
  overflow: hidden;
  height: 100vh;
`;

const MyContent = styled(Content)`
  height: 100%;
  overflow-y: scroll;
`;

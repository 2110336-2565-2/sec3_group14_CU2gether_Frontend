import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ConfigProvider, Layout } from "antd";
import theme from "@/utils/theme";
import Navbar from "@/components/navbar";
import styled from "styled-components";
config.autoAddCss = false;

const { Content, Footer } = Layout;
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {}, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <Layout>
        <Navbar />
        <MyContent>
          <Component {...pageProps} />
        </MyContent>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

const MyContent = styled(Content)`
  overflow-y: scroll;
`;

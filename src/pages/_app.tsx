import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ConfigProvider } from "antd";
import theme from "@/utils/theme";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

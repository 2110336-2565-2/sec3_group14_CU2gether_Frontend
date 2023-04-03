import theme from "@/utils/theme";
import { ConfigProvider, Modal } from "antd";
import React from "react";

const ReportProvider = (props: any) => {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
        components: {
          Button: {
            colorPrimary: `${theme.color.primary}`,
            colorPrimaryHover: `${theme.color.backgroundOnHover}`,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ReportProvider;

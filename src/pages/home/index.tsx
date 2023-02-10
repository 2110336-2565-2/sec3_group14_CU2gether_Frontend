import React from "react";

import LoginButton from "@/components/login/LoginButton";

import { ConfigProvider } from "antd";

const home: React.FC<{}> = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E16D62",
                },
            }}
        >
            <LoginButton />
        </ConfigProvider>
    );
};

export default home;

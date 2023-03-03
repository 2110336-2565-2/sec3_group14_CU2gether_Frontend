import styled from "styled-components";
import { Inter } from "@next/font/google";
import { useState } from "react";

// import styles from "@/styles/Home.module.css";
import Menubar from "@/components/Menubar";
import Content from "@/components/Content";
import { ConfigProvider } from "antd";
import LoginAndRegistration from "@/components/login-registration/LoginAndRegistrationModal";
import theme from "@/utils/theme";

const inter = Inter({ subsets: ["latin"] });

const HomeContainer = styled.div`
  background-image: url(background_page.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export default function Home() {
  const [onLoginAndRegistration, setOnLoginAndRegistration] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const toggleLoginAndRegistrationModal = () => {
    setOnLoginAndRegistration(!onLoginAndRegistration);
    console.log("clicked!");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `${theme.color.primary}`,
        },
      }}
    >
      <div
        className={inter.className}
        style={{
          backgroundImage: `url(background_page.png)`,
          backgroundSize: "cover",
          backgroundPosition: `center center`,
          backgroundRepeat: `no-repeat`,
          backgroundAttachment: `fixed`,
          height: `3876px`,
        }}
      >
        <Menubar
          toggleLoginAndRegistrationModal={toggleLoginAndRegistrationModal}
          setLogin={setLogin}
        />
        <LoginAndRegistration
          isLogin={isLogin}
          setLogin={setLogin}
          onLoginAndRegistrationModal={onLoginAndRegistration}
          toggleLoginAndRegistrationModal={toggleLoginAndRegistrationModal}
        ></LoginAndRegistration>
        {/* <Content /> */}
      </div>
    </ConfigProvider>
  );
}

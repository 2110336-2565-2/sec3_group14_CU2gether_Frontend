import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Registration from "@/components/registration/RegistrationPopup";
import { Button, ConfigProvider } from "antd";
import LoginButton from "../components/login/LoginButton";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
//import styles from '@/styles/Home.module.css'
import Menubar from "@/components/Menubar";
import Content from "@/components/Content";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [onRegistration, setOnRegistration] = useState(false);

    const toggleRegistrationModal = (): void => {
        setOnRegistration(!onRegistration);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E16D62",
                },
            }}
        >
            <Button onClick={() => toggleRegistrationModal()} />
            <Registration
                toggleRegistrationModal={toggleRegistrationModal}
                onRegistration={onRegistration}
            />
            <LoginButton />
        </ConfigProvider>
    );
    return (
        <>
            <div
                className={inter.className}
                style={{
                    backgroundImage: `url(background_page.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: `center center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundAttachment: `fixed`,
                    // height: `3876px`
                }}
            >
                <Menubar />
                <Content />
            </div>
        </>
    );
}

import { Inter } from "@next/font/google";
import { useState } from "react";

// import styles from "@/styles/Home.module.css";
import Menubar from "@/components/Menubar";
import Content from "@/components/Content";
import { ConfigProvider, Form, Input } from "antd";
import LoginAndRegistration from "@/components/login-registration/LoginAndRegistrationModal";
import theme from "@/utils/theme";
import FormInput from "@/components/basic-components/FormInput";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [onLoginAndRegistration, setOnLoginAndRegistration] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const toggleLoginAndRegistrationModal = () => {
    setOnLoginAndRegistration(!onLoginAndRegistration);
    console.log("clicked!");
  };

  const Eiei: React.FC<{}> = ({}) => {
    const tmp = (
      <Form>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
      </Form>
    );
    return tmp;
  };

  console.log(Eiei);
  return (
    <div>
      <>{Eiei}</>
      <FormInput text="eiei" isRequired={true} form={Eiei} />
    </div>
    // <ConfigProvider
    //     theme={{
    //         token: {
    //             colorPrimary: `${theme.color.primary}`,
    //         },
    //     }}
    // >
    //     <div
    //         className={inter.className}
    //         style={{
    //             backgroundImage: `url(background_page.png)`,
    //             backgroundSize: "cover",
    //             backgroundPosition: `center center`,
    //             backgroundRepeat: `no-repeat`,
    //             backgroundAttachment: `fixed`,
    //             height: `3876px`,
    //         }}
    //     >
    //         <Menubar
    //             toggleLoginAndRegistrationModal={
    //                 toggleLoginAndRegistrationModal
    //             }
    //             setLogin={setLogin}
    //         />
    //         <LoginAndRegistration
    //             isLogin={isLogin}
    //             setLogin={setLogin}
    //             onLoginAndRegistrationModal={onLoginAndRegistration}
    //             toggleLoginAndRegistrationModal={
    //                 toggleLoginAndRegistrationModal
    //             }
    //         ></LoginAndRegistration>
    //         {/* <Content /> */}
    //     </div>
    // </ConfigProvider>
  );
}

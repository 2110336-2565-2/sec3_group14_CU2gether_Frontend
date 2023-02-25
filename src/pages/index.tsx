import { Inter } from "@next/font/google";
import { useState } from "react";

// import styles from "@/styles/Home.module.css";
import Menubar from "@/components/Menubar";
import Content from "@/components/Content";
import { ConfigProvider, Form, Input, Radio } from "antd";
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
      <Form.Item name="username">
        <Radio.Group defaultValue="a">
          <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b">Shanghai</Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button>
          <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group>
      </Form.Item>
    );
    return tmp;
  };

  return (
    <div>
      <FormInput text="eiei" isRequired={true} DataForm={Eiei} />
      <FormInput
        text="eieieieieieieieieieieieieieieieieieieiei"
        isRequired={true}
        DataForm={Eiei}
      />
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

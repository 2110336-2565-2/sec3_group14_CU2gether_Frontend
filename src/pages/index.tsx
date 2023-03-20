import { Inter } from "@next/font/google";
import Image from "next/image";
import { useState } from "react";

import LoginAndRegistration from "@/components/login-registration/LoginAndRegistrationModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [onLoginAndRegistration, setOnLoginAndRegistration] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const toggleLoginAndRegistrationModal = () => {
    setOnLoginAndRegistration(!onLoginAndRegistration);
    console.log("clicked!");
  };

  return (
    <>
      <Image src={"./background.svg"} alt={"background image"} fill />
    </>
  );
}

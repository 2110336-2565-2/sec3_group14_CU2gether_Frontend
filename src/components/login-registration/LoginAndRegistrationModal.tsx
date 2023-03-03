import React, { useState } from "react";

import { ROLE } from "@/utils/Enum";
import styled from "styled-components";
import theme from "@/utils/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import LoginContent from "./LoginContent";
import RegistrationContent from "./RegistrationContent";
import Image from "next/image";
import CU2Gether_logo from "../../../asset/CU2Gether_logo.png";

const ContentWrapper = styled.div`
  margin-top: 10px;
`;

const RegistrationTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: black;
`;

export enum MODE {
  SELECTROLE = "selectRole",
  SIGNUP = "signUp",
  DONE = "done",
}

type LoginAndRegistrationModalProps = {
  isLogin: boolean;
  setLogin(isLogin: boolean): void;
  toggleLoginAndRegistrationModal(): void;
  onLoginAndRegistrationModal: boolean;
};

const LoginAndRegistrationModal: React.FC<LoginAndRegistrationModalProps> = ({
  isLogin,
  setLogin,
  toggleLoginAndRegistrationModal,
  onLoginAndRegistrationModal,
}) => {
  const [mode, setMode] = useState<MODE>(MODE.SELECTROLE);
  const [role, setRole] = useState<ROLE>(ROLE.STUDENT);

  const onSelectRole = (role: ROLE) => {
    setMode(MODE.SIGNUP);
    setRole(role);
  };

  const onSelectMode = (mode: MODE) => {
    setMode(mode);
  };

  const title =
    mode === MODE.SELECTROLE
      ? "Who are you?"
      : mode === MODE.SIGNUP
      ? role === ROLE.ORGANIZER
        ? "Request Form"
        : "Sign Up"
      : null;

  const Content = isLogin ? (
    <LoginContent
      onSelectMode={onSelectMode}
      setLogin={setLogin}
      toggleRegistrationModal={toggleLoginAndRegistrationModal}
    />
  ) : (
    <RegistrationContent
      role={role}
      onSelectRole={onSelectRole}
      mode={mode}
      onSelectMode={onSelectMode}
      toggleRegistrationModal={toggleLoginAndRegistrationModal}
      onRegistration={onLoginAndRegistrationModal}
    />
  );

  return (
    <Modal
      open={onLoginAndRegistrationModal}
      width={600}
      centered={true}
      closable={true}
      afterClose={() => setMode(MODE.SELECTROLE)}
      bodyStyle={{ minHeight: 500, marginTop: 40 }}
      closeIcon={
        <FontAwesomeIcon
          onClick={() => toggleLoginAndRegistrationModal()}
          icon={faCircleXmark}
          size={"2x"}
        />
      }
      footer={null}
      title={
        isLogin ? (
          <LoginTitle>
            Log in to
            <span style={{ color: "#F96491" }}> CU</span>
            2Gether
            {/* <Image src={CU2Gether_logo} alt="logo" width={200} height={30}/> */}
          </LoginTitle>
        ) : (
          <RegistrationTitle>{title}</RegistrationTitle>
        )
      }
    >
      {<ContentWrapper>{Content}</ContentWrapper>}
    </Modal>
  );
};

export default LoginAndRegistrationModal;

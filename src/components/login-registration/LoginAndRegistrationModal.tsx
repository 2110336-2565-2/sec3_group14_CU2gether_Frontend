import React, { useState } from "react";

import { ROLE } from "@/types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import CenteredModal from "@/common/modal";
import LoginContent from "./LoginContent";
import RegistrationContent from "./RegistrationContent";

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
  SELECTROLE = "SELECTROLE",
  SIGNUP = "SIGNUP",
  DONE = "DONE",
}

type LoginAndRegistrationModalProps = {
  isLoggingIn: boolean;
  setLoggingIn(isLogin: boolean): void;
  closeLoginAndRegistrationModal(): void;
  isOpen: boolean;
};

const LoginAndRegistrationModal: React.FC<LoginAndRegistrationModalProps> = ({
  isLoggingIn,
  setLoggingIn,
  closeLoginAndRegistrationModal,
  isOpen,
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

  const Content = isLoggingIn ? (
    <LoginContent
      onSelectMode={onSelectMode}
      setLoggingIn={setLoggingIn}
      closeLoginModal={closeLoginAndRegistrationModal}
    />
  ) : (
    <RegistrationContent
      role={role}
      onSelectRole={onSelectRole}
      mode={mode}
      onSelectMode={onSelectMode}
      closeRegistrationModal={closeLoginAndRegistrationModal}
    />
  );

  return (
    <CenteredModal
      open={isOpen}
      width={600}
      centered={true}
      closable={true}
      onCancel={closeLoginAndRegistrationModal}
      afterClose={() => setMode(MODE.SELECTROLE)}
      bodyStyle={{ minHeight: 500, marginTop: 40 }}
      closeIcon={
        <FontAwesomeIcon
          onClick={closeLoginAndRegistrationModal}
          icon={faCircleXmark}
          size={"2x"}
          transform={"left-4x"}
        />
      }
      footer={null}
      title={
        isLoggingIn ? (
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
    </CenteredModal>
  );
};

export default LoginAndRegistrationModal;

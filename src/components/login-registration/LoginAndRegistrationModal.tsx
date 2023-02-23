import { Button, Modal } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { USER_ROLE_REF } from "@/utils/Enum";
import theme from "@/utils/theme";
import LoginContent from "./LoginContent";
import RegistrationContent from "./RegistrationContent";

const StyledButton = styled(Button)`
  height: 35px;
  width: 100px;
  font-size: 20px;
  margin-right: 50px;
  border-radius: 6px;
  background-color: white;
  border: none;
  :hover {
    background-color: #bfbfbf;
  }
  ${theme.media.tablet} {
    margin-right: 0px;
    width: 600px;
    font-size: 24px;
    margin: 30px;
  }
  ${theme.media.mobile} {
    width: 340px;
    height: 30px;
    font-size: 15px;
  }
`;

const ContentContainer = styled.div`
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

const CU = styled.span`
  color: ${theme.color.pink};
`;

export const MODE = {
  SELECTROLE: "selectRole",
  SIGNUP: "signUp",
  DONE: "done",
};

type Props = {
  isLogin: boolean;
  setLogin(isLogin: boolean): void;
  toggleLoginAndRegistrationModal(): void;
  onLoginAndRegistrationModal: boolean;
};

const LoginAndRegistrationModal: React.FC<Props> = ({
  isLogin,
  setLogin,
  toggleLoginAndRegistrationModal,
  onLoginAndRegistrationModal,
}) => {
  const [mode, setMode] = useState(MODE.SELECTROLE);
  const [role, setRole] = useState("");

  const onSelectRole = (role: string) => {
    setMode(MODE.SIGNUP);
    setRole(role);
  };

  const onSelectMode = (mode: string) => {
    setMode(mode);
  };

  const title =
    mode === MODE.SELECTROLE
      ? "Who are you?"
      : mode === MODE.SIGNUP
      ? role === USER_ROLE_REF.ORGANIZER
        ? "Request Form"
        : "Sign Up"
      : null;

  const Content = isLogin ? (
    <LoginContent onSelectMode={onSelectMode} setLogin={setLogin} />
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
            <CU> CU</CU>
            2Gether
          </LoginTitle>
        ) : (
          <RegistrationTitle>{title}</RegistrationTitle>
        )
      }
    >
      {<ContentContainer>{Content}</ContentContainer>}
    </Modal>
  );
};

export default LoginAndRegistrationModal;

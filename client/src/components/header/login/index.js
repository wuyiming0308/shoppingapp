import React, { useState } from "react";
import { Modal } from "antd";

import "antd/dist/antd.min.css";
import "./style.css";
import ModalContent from "./signincontent";
import SignUpComponent from "./signup";
import ForgotPasswordComponent from "./forgotpassword";

/** @enum {string} */
const ModalState = {
  NONE: "none",
  SIGN_IN: "sign-in",
  SIGN_UP: "sign-up",
  FORGOT_PASSWORD: "forgot-password",
};

const SignIn = ({ handleSignIn = () => {} }) => {
  const [modalState, setModalState] = useState(ModalState.NONE);

  /**
   * @param {!ModalState} type
   */
  const showModal = (type) => {
    setModalState(type);
  };

  const getModalContent = () => {
    switch (modalState) {
      case ModalState.SIGN_UP:
        return <SignUpComponent showModal={showModal} />;
      case ModalState.SIGN_IN:
        return (
          <ModalContent showModal={showModal} handleSignIn={handleSignIn} />
        );
      case ModalState.FORGOT_PASSWORD:
        return <ForgotPasswordComponent />;
      default:
    }
  };

  /**
   * @return {string|undefined}
   */
  const getModalType = () => {
    switch (modalState) {
      case ModalState.SIGN_UP:
        return "Sign up an account";
      case ModalState.SIGN_IN:
        return "Sign in to your account";
      case ModalState.FORGOT_PASSWORD:
        return "Update Your password";
      default:
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => void showModal(ModalState.SIGN_IN)}
          className="CustomerSigninButton"
        >
          Sign In
        </button>
        <Modal
          title={getModalType()}
          visible={modalState !== ModalState.NONE}
          onCancel={() => void showModal(ModalState.NONE)}
          footer={null}
          className="ModalPosition"
        >
          {getModalContent()}
        </Modal>
      </div>
    </>
  );
};

export { SignIn, ModalState };

import { ModalState } from "../index";
import React, { useState } from "react";
import { signInRequest } from "../../../../data/requestservice";
import "./style.css";
import { InputType, Input } from "../../../wigdet/input";

const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const ErrorCode = {
  INVALID_EMAIL: "invalid email",
  INVALID_PASSWORD: "invalid password",
  SIGNUP_FAILURE: "signup failure",
  SIGNIN_FAILURE: "signin failure",
};

const ModalContent = ({ showModal = () => {}, handleSignIn = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValidate, setFormValidate] = useState({
    email: true,
    password: true,
  });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    const data = await signInRequest({ email, password });
    if (data && data.success) {
      showModal(ModalState.NONE);
      handleSignIn();
    } else if (data.error === ErrorCode.INVALID_EMAIL) {
      setFormValidate((e) => ({ ...e, email: data.error }));
    } else {
      setFormValidate((e) => ({ ...e, password: data.error }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formValidStateA = Object.assign({ ...formValidate });
    const emailValid = regex.test(email);
    formValidStateA.email =
      email && email.length >= 0 && emailValid ? "" : "Invalid email input!";
    formValidStateA.password =
      password && password.length >= 0 ? "" : "Invalid password input!";

    setFormValidate({ ...formValidStateA });
    if (formValidStateA.email === "" && formValidStateA.password === "") {
      signIn();
    }
  };

  return (
    <>
      <div className="LoginForm">
        <Input
          type="text"
          label="Email"
          htmlFor="Email"
          placeholder="Enter your email"
          onChange={onEmailChange}
          value={email}
          errorMessage={formValidate.email}
          inputType={InputType.INPUT}
        />
        <Input
          type="password"
          label="Password"
          htmlFor="Password"
          placeholder="Enter your password"
          onChange={onPasswordChange}
          value={password}
          errorMessage={formValidate.password}
          inputType={InputType.INPUT}
        />
        <div>
          <button className="GnericButton" onClick={onSubmit}>
            Sign In
          </button>
        </div>
      </div>

      <div className="ButtonContainer">
        <div
          dangerouslySetInnerHTML={{
            __html: "Don't have an account? <a>Sign up</a>",
          }}
          onClick={() => {
            showModal(ModalState.SIGN_UP);
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: "<a>Forgot password?</a>",
          }}
          onClick={() => {
            showModal(ModalState.FORGOT_PASSWORD);
          }}
        />
      </div>
    </>
  );
};

export default ModalContent;

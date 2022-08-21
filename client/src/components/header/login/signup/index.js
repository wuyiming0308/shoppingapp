import React, { useState } from "react";
import { ModalState } from "../index";
import { register } from "../../../../redux/actions/auth";
import { InputType, Input } from "../../../wigdet/input";
import { useDispatch } from "react-redux";
import "./style.css";

const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const ErrorCode = {
  INVALID_EMAIL: "invalid email",
  INVALID_PASSWORD: "invalid password",
  SIGNUP_FAILURE: "signup failure",
  SIGNIN_FAILURE: "signin failure",
};

const SignUpComponent = (props) => {
  const { showModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValidate, setFormValidate] = useState({
    email: true,
    password: true,
  });
  const dispatch = useDispatch();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formValidState = Object.assign({ ...formValidate });
    const emailValid = regex.test(email);
    formValidState.email =
      email && email.length >= 0 && emailValid ? "" : ErrorCode.INVALID_EMAIL;
    formValidState.password =
      password && password.length >= 0 ? "" : ErrorCode.INVALID_PASSWORD;

    console.log(formValidState.password);
    setFormValidate({ ...formValidState });
    if (formValidState.email === "" && formValidState.password === "") {
      createAccount();
    }
  };

  const createAccount = () => {
    dispatch(register(email, password))
      .then(() => {})
      .catch(handleSignUpError);
  };

  const handleSignUpError = (error) => {
    console.log(error);
    if (error === ErrorCode.INVALID_PASSWORD) {
      setFormValidate((e) => ({ ...e, password: error }));
    } else {
      console.log(1);
      setFormValidate((e) => ({ ...e, email: error }));
    }
  };

  return (
    <>
      <div className="SignupForm">
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
            Create account
          </button>
        </div>
      </div>

      <div
        onClick={() => showModal(ModalState.SIGN_IN)}
        className="ButtonContainer"
      >
        Already have an account?
        <button className="SigninButton">Sign in</button>
      </div>
    </>
  );
};

export default SignUpComponent;

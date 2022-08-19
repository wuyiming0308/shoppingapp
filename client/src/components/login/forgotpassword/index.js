import { useState } from "react";
import "./style.css";
import { InputType, Input } from "../../wigdet/input";
const ForgotPasswordComponent = () => {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const [email, setEmail] = useState("");
  const [formValidate, setFormValidate] = useState({ email: true });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formValidState = Object.assign({ ...formValidate });
    const emailValid = regex.test(email);
    formValidState.email =
      email && email.length >= 6 && emailValid ? "" : "Invalid input";
    console.log(formValidState.email);
    setFormValidate({ ...formValidState });
  };

  return (
    <>
      <div className="PasswordForm">
        <Input
          label="Email"
          htmlFor="Email"
          placeholder="Enter your email"
          inputType={InputType.INPUT}
          onChange={onEmailChange}
          value={email}
          errorMessage={formValidate.email}
        />
        <div>
          <button className="GnericButton" onClick={onSubmit}>
            Update password
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;

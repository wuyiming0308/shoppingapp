import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

import { SignIn } from "../login";
import SignoutButton from "./logout";
import CartButton from "./cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="Header">
      <h1 className="HeaderTitle" role="button" onClick={goHome}>
        Management Chuwa
      </h1>
      <div className="SearchBarContainer">
        <input className="SearchBar" placeholder="Search" />
      </div>
      <div className="HeaderButtonContainer">
        {isLoggedIn ? <SignoutButton /> : <SignIn />}
        <CartButton />
      </div>
    </div>
  );
};

export default Header;

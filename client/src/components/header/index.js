import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

import { SignIn } from "../login";
import SignoutButton from "./logout";
import CartButton from "./cart";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="Header">
      <h1 className="HeaderTitle">Management Chuwa</h1>
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

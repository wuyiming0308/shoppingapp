import React, { useState } from "react";
import "./index.css";

import { SignIn } from "./login";
import SignoutButton from "./logout";
import CartButton from "./cart";

const Header = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="Header">
      <h1 className="HeaderTitle">Management Chuwa</h1>
      <div className="SearchBarContainer">
        <input className="SearchBar" placeholder="Search" />
      </div>
      <div className="HeaderButtonContainer">
        {isSignIn ? (
          <SignoutButton
            handleSignout={() => {
              setIsSignIn(false);
            }}
          />
        ) : (
          <SignIn
            handleSignIn={() => {
              setIsSignIn(true);
            }}
          />
        )}
        <CartButton />
      </div>
    </div>
  );
};

export default Header;

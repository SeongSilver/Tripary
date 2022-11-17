import React from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

function Header() {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="headerRight">
          <Link to="/shareboard" className="headLink">
            community
          </Link>
          <Link to="/Login" className="headLink">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

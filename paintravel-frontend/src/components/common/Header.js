import React from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="logo">
          <Link to="/">페인트레블<img src="../../img/logo.png"></img></Link>
        </div>
        <div className="headerRight">
          <Link to="/shareboard" className="headLink">community</Link>
          <Link to="/Login" className="headLink">sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

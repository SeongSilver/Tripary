import React from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";
import logo from "../../img/common/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="headerWrapper">
        <div className="skipNav">
          <Link to="/">본문바로가기</Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="headerRight">
          <Link to="/postWrite" className="headLink">
            글쓰기
          </Link>
          <Link to="/Login" className="headLink">
            sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

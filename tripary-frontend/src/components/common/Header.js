import React from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="logo">
          <Link to="/">페인트레블</Link>
        </div>
        <div className="headerRight">
          <Link to="/post" className="headLink">
            포스트
          </Link>
          <Link to="/shareboard" className="headLink">
            공유게시판
          </Link>
          <Link to="/mypage" className="headLink">
            마이페이지
          </Link>
          <Link to="/none" className="headLink">
            헤더푸터없는페이지
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

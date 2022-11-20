import React from 'react';
import '../../styles/common/header.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="skipNav">
          <Link to="/">본문바로가기</Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={require('../../img/logo.png')} alt="logo" />
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

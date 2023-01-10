import React, { useState, useEffect } from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../_actions/user_actions";
import { logoutUser } from "../../_actions/user_actions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [existLocalStorage, setExistLocalStorage] = useState(false);

  //키, 값을 매개변수로 받는 localStorage setItem 하는 함수
  const setLoginedItem = (key, value) => {
    if (key === null || value === null) {
      console.log("setItem에 매개변수 안들어감");
      return;
    }
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + 1800000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  useEffect(() => {
    dispatch(auth()).then((response) => {
      //localStorage에 LOGINEDID를 만드는 함수에 response에서 받아온 id넣음
      if (response.payload._id) {
        setLoginedItem("LOGINEDID", response.payload._id);
        setExistLocalStorage(true);
      } else {
        setExistLocalStorage(false);
      }
      if (response.payload._id === null || response.payload._id === "") {
        localStorage.clear();
      }
    });
  }, []);

  //로컬스토리지에 LOGINEDID가 있을 경우 실행
  if (existLocalStorage) {
    //로그인된 아이디의 만료시간
    const expireTime = JSON.parse(localStorage.getItem("LOGINEDID")).expiry;

    //현재시간이 LOGINEDID 만료시간보다 길면 localStorage에 있는 LOGINEDID 삭제
    setInterval(() => {
      const nowTime = new Date().getTime();

      if (nowTime > expireTime) {
        localStorage.removeItem("LOGINEDID");
      }
    }, 300000);
  }

  const onClickHandler = () => {
    localStorage.removeItem("LOGINEDID");
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSucess) {
        navigate("/Login");
      } else {
        alert("로그인아웃 실패..!");
      }
    });
  };

  return (
    <header className="header">
      <div className="headerWrapper">
        <div className="skipNav">
          <Link to="/">본문바로가기</Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={require("../../img/common/logo.png")} alt="logo" />
          </Link>
        </div>
        <div className="headerRight">
          <Link to="/mypage" className="headLink">
            my page
          </Link>
          {/* {existLocalStorage && (
            <a href="#" className="headLink" onClick={onClickHandler}>
              logout
            </a>
          )}
          {existLocalStorage || (
            <Link to="/Login" className="headLink">
              sign in
            </Link>
          )} */}
          {existLocalStorage ? (
            <a href="#" className="headLink" onClick={onClickHandler}>
              logout
            </a>
          ) : (
            <Link to="/Login" className="headLink">
              sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

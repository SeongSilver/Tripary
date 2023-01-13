import React, { useState, useLayoutEffect } from "react";
import "../../styles/mypage/mypage.scss";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function MyPage() {
  const [login_id, setLogin_id] = useState("*");
  const [sortBy, setSortBy] = useState("_id");//정렬기준 - 기본 : 작성일
  const [sort, setSort] = useState(-1);//정렬차순 - 내림차순 : -1 오름차순 : 1
  const [mypageList, setMypageList] = useState();
  const [needToReciveData, setNeedToReciveData] = useState(true)
  let maList = [];
  const existLocalStorage = localStorage.key("LOGINEDID");
  useLayoutEffect(() => {
    if (existLocalStorage) {
      setLogin_id(JSON.parse(localStorage.getItem("LOGINEDID")).value);
    }
    if (needToReciveData) {
      if (login_id !== "*") {
        const sendData = {
          currentId: login_id,
          sort : sort,
          sortBy: sortBy,
        };
        axios
          .post("/api/post/getMypage", sendData)
          .then(function (res) {
            setMypageList(res.data.mypageList)
            setNeedToReciveData(false);
          })
          .catch((err) => console.log("에러발생" + err));
      }
    }
    console.log(mypageList)
  }, [login_id, sortBy, mypageList]);

  return (
    <div className="mypageContainer">
      {mypageList ? (<div>{mypageList[0].title}</div>):(<div>읍닫데이타</div>)}
      {mypageList ? (mypageList.map((data) => {
        <div>{data.title}</div>
      })) : (<div>dkw</div>)}
      </div>
  )
}

export default MyPage;

import React, { useState, useEffect } from "react";
import "../../styles/mypage/mypage.scss";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function MyPage() {
  const [login_id, setLogin_id] = useState("*");
  const [sortBy, setSortBy] = useState("writeDate");//정렬기준 - (기본값) writeDate, fromDate 
  const [sort, setSort] = useState(1);//정렬차순 - (기본값)오름차순 : 1, 내림차순 : -1 
  const [mypageList, setMypageList] = useState();
  const [needToReciveData, setNeedToReciveData] = useState(true)
  let maList = [];
  const existLocalStorage = localStorage.key("LOGINEDID");
  useEffect(() => {
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
        console.log(sendData)
        axios
          .post("/api/post/getMypage", sendData)
          .then(function (res) {
            setMypageList(res.data.mypageList)
            setNeedToReciveData(false);
          })
          .catch((err) => console.log("에러발생" + err));
      }
    }

  }, [login_id, sortBy, mypageList, sort]);

  const sortByThis = (data) => {
    console.log(data)
    setSortBy(data);
    setSort(1)
    setNeedToReciveData(true);
  }
  const sorting = (data) => {
    console.log(data)
    setSort(data);
    setNeedToReciveData(true);
  }

  return (
    <div className="mypageContainer" style={{zIndex:"999"}}>
      <button type="button" onClick={() => sortByThis("writeDate")}>정렬기준:작성일</button>
      <button type="button" onClick={() => sortByThis("fromDate")}>정렬기준:여행시작일</button>
      <button type="button" onClick={() => sorting(1)}>정렬순서:내림차순</button>
      <button type="button" onClick={() => sorting(-1)}>정렬기준:오름차순</button>
      <ul>
      {mypageList ? (mypageList.map((data) => (
        <li key = {data._id}>
        <img  width = {40} height={40} src={`/upload/${data.file[0]}`}/>
        <div>{data.title}</div>
        <div>{data.country}</div>
        <div>{new Date(data.writeDate).toLocaleDateString()}</div>
        <p className="cardDate">
              {new Date(data.fromDate).toLocaleDateString()} ~{" "}
              {new Date(data.toDate).toLocaleDateString()}
        </p>
        </li>
      ))) : (<div>작성된 글이 없습니다</div>)}
      </ul>
      </div>
  )
}

export default MyPage;

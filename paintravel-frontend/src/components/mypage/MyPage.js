import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { BiEdit, BiTrash } from "react-icons/bi";
import ContentModal from "../post/ContentModal";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";

import "../../styles/mypage/mypage.scss";

function MyPage() {
  const [loading, setLoading] = useState(true);
  //페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [search, setSearch] = useState("");

  const [login_id, setLogin_id] = useState("*");
  const [sortBy, setSortBy] = useState("fromDate"); //정렬기준 - (기본값) writeDate, fromDate
  const [sort, setSort] = useState(1); //정렬차순 - (기본값)오름차순 : 1, 내림차순 : -1
  const [mypageList, setMypageList] = useState();
  const [needToReciveData, setNeedToReciveData] = useState(true);
  const existLocalStorage = localStorage.key("LOGINEDID");

  const [check, setCheck] = useState(false);
  const [modalData, setModalData] = useState();

  const openContentModal = (event) => {
    console.log(event.currentTarget.children[0].textContent);
    setCheck(true);
    console.log(event.currentTarget.children[0].textContent);
    const modalData = {
      currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
      post_id: event.currentTarget.children[0].textContent,
    };
    axios
      .post("api/post/getPostInfo", modalData)
      .then((response) => {
        console.log("데이터 탐색 성공");
        console.log(response.data);
        setModalData(response.data.postInfo[0]);
      })
      .catch((error) => {
        console.log("데이터 탐색 에러 발생");
      });
  };

  const mypageSearchHandler = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    if (existLocalStorage) {
      setLogin_id(JSON.parse(localStorage.getItem("LOGINEDID")).value);
    }
    if (needToReciveData) {
      if (login_id !== "*") {
        const sendData = {
          currentId: login_id,
          sort: sort,
          sortBy: sortBy,
        };
        console.log(sendData);
        axios
          .post("/api/post/getMypage", sendData)
          .then(function (res) {
            console.log(res.data);
            setMypageList(res.data.mypageList);
            setNeedToReciveData(false);
            setLoading(false);
          })
          .catch((err) => console.log("에러발생" + err));
      }
    }
  }, [login_id, sortBy, mypageList, sort]);
  const sortByThis = (data) => {
    console.log(data);
    setSortBy(data);
    setSort(1);
    setNeedToReciveData(true);
  };
  const sorting = (data) => {
    console.log(data);
    setSort(data);
    setNeedToReciveData(true);
  };

  const postDeleteHandler = (data) => {
    console.log(data);
    const deletePostInfo = {
      currentId: data.writer,
      post_id: data._id,
    };
    console.log(deletePostInfo);
    axios
      .post("api/post/getPostDelete", deletePostInfo)
      .then((response) => {
        console.log("게시물 삭제 성공");
        location.reload();
      })
      .catch((error) => {
        console.log("게시물 삭제 실패");
      });
  };

  const selectHandler = (event) => {
    setLimit(Number(event.target.value));
    console.log(limit);
  };

  const ListChangeHandler = (event) => {
    console.log(event.currentTarget.child);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mypageContainer">
          <div className="myPageBtn">
            <input
              type="text"
              value={search}
              onChange={mypageSearchHandler}
              placeholder="제목 검색"
            />
            <button type="button" onClick={() => sortByThis("writeDate")}>
              정렬기준:작성일
            </button>
            <button type="button" onClick={() => sortByThis("fromDate")}>
              정렬기준:여행시작일
            </button>
            <button type="button" onClick={() => sorting(1)}>
              정렬순서:내림차순
            </button>
            <button type="button" onClick={() => sorting(-1)}>
              정렬기준:오름차순
            </button>
            <label>
              게시물 수 : &nbsp;
              <select type="number" value={limit} onChange={selectHandler}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>
          <div className="myPageListContainer">
            <ul className="myPageList">
              {mypageList ? (
                mypageList
                  .filter((data) => {
                    return data.title
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
                  })
                  .slice(offset, offset + limit)
                  .map((data) => (
                    <li key={data._id}>
                      <div onClick={openContentModal}>
                        <span>{data._id}</span>
                        <img
                          width={40}
                          height={40}
                          src={`/upload/${data.file[0]}`}
                        />
                      </div>
                      <div onClick={openContentModal}>{data.title}</div>
                      <div>{data.country}</div>
                      <div>
                        업로드 날짜 :{" "}
                        {new Date(data.writeDate).toLocaleDateString()}
                      </div>
                      <p className="cardDate">
                        {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                        {new Date(data.toDate).toLocaleDateString()}
                      </p>
                      <Link
                        to="/postEdit"
                        state={{
                          selectedCountry: data.country,
                          nationCode: data.nationCode,
                          _id: data._id,
                          writer: data.writer,
                        }}>
                        <BiEdit />
                      </Link>
                      <span
                        className="postEditBtn"
                        onClick={() => postDeleteHandler(data)}
                        style={{ zIndex: "999", cursor: "pointer" }}>
                        <BiTrash />
                      </span>
                    </li>
                  ))
              ) : (
                <div>작성된 글이 없습니다</div>
              )}
              {mypageList ? (
                <div>
                  <Pagination
                    total={mypageList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              ) : null}
            </ul>
          </div>
        </div>
      )}
      {check && <ContentModal modalData={modalData} setCheck={setCheck} />}
    </>
  );
}

export default MyPage;

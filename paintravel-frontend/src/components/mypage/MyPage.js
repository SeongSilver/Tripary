import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { BiEdit, BiTrash } from "react-icons/bi";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
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
  const existLocalStorage = localStorage.getItem("LOGINEDID");

  const [check, setCheck] = useState(false);
  const [modalData, setModalData] = useState();

  const openContentModal = (event) => {
    if (
      event.target.tagName !== "svg" ||
      event.target.tagName !== "a" ||
      event.target.tagName !== "path"
    ) {
      setCheck(true);
      const modalData = {
        currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
        post_id: event.currentTarget.children[0].textContent,
      };
      axios
        .post("api/post/getPostInfo", modalData)
        .then((response) => {
          setModalData(response.data.postInfo[0]);
        })
        .catch((error) => {
          console.log("데이터 탐색 에러 발생"+error);
        });
    } else if (event.target.tagName === "svg") {
      setCheck(false);
    }
  };

  const mypageSearchHandler = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  useLayoutEffect(() => {
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
    setSortBy(data);
    setSort(1);
    setNeedToReciveData(true);
  };
  const sorting = (data) => {
    setSort(data);
    setNeedToReciveData(true);
  };

  const postDeleteHandler = (data) => {
    const deletePostInfo = {
      currentId: data.writer,
      post_id: data._id,
    };
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      axios
        .post("api/post/getPostDelete", deletePostInfo)
        .then((response) => {
          location.reload();
        })
        .catch((error) => {
          console.log("게시물 삭제 실패");
          console.log(error);
        });
    } else {
      alert("삭제를 취소합니다");
    }
  };

  const selectHandler = (event) => {
    setLimit(Number(event.target.value));
  };

  return (
    <div className="myPage">
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
              정렬:작성일
            </button>
            <button type="button" onClick={() => sortByThis("fromDate")}>
              정렬:여행시작일
            </button>
            <button type="button" onClick={() => sorting(1)}>
              정렬:내림차순
            </button>
            <button type="button" onClick={() => sorting(-1)}>
              정렬:오름차순
            </button>
            <label>
              게시물 수&emsp;
              <select type="number" value={limit} onChange={selectHandler}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>
          </div>
          <div className="myPageListContainer">
            <ul className="myPageMenu">
              <li>여행국가</li>
              <li>제목</li>
              <li>사진</li>
              <li>
                여행기간
                <span>
                  <GoChevronUp
                    onClick={() => {
                      sorting(-1);
                      sortByThis("fromDate");
                    }}
                  />
                  <GoChevronDown
                    onClick={() => {
                      sorting(1);
                      sortByThis("fromDate");
                    }}
                  />
                </span>
              </li>
              <li>
                업로드일
                <span>
                  <GoChevronUp
                    onClick={() => {
                      sorting(-1);
                      sortByThis("writeDate");
                    }}
                  />
                  <GoChevronDown
                    onClick={() => {
                      sorting(1);
                      sortByThis("writeDate");
                    }}
                  />
                </span>
              </li>
              <li>수정/삭제</li>
            </ul>
            <div className="myPageListDiv">
              <div className="myPageList">
                <ul>
                  {mypageList ? (
                    mypageList
                      .filter((data) => {
                        return data.title
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase());
                      })
                      .slice(offset, offset + limit)
                      .map((data) => (
                        <li
                          className="mypageListLi"
                          onClick={openContentModal}
                          key={data._id}>
                          <span>{data._id}</span>
                          <ul className="mypageListSmallUl">
                            <li>{data.country}</li>
                            <li>{data.title}</li>
                            <li>
                              <img
                                width={40}
                                height={40}
                                src={`/upload/${data.file[0]}`}
                              />
                            </li>
                            <li className="cardDate">
                              {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                              {new Date(data.toDate).toLocaleDateString()}
                            </li>
                            <li>
                              {new Date(data.writeDate).toLocaleDateString()}
                            </li>
                            <li>
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
                              <BiTrash
                                className="postEditBtn"
                                onClick={() => postDeleteHandler(data)}
                                style={{ zIndex: "999", cursor: "pointer" }}
                              />
                            </li>
                          </ul>
                        </li>
                      ))
                  ) : (
                    <div>작성된 글이 없습니다</div>
                  )}
                </ul>
              </div>
            </div>
            <div className="myPagePagination">
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
            </div>
          </div>
        </div>
      )}
      {check && <ContentModal modalData={modalData} setCheck={setCheck} />}
    </div>
  );
}

export default MyPage;

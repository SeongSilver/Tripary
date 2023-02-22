import React, { useState, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { BiEdit, BiTrash } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import ContentModal from "../post/ContentModal";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";

import "../../styles/mypage/mypage.scss";

function MyPage() {
  const [loading, setLoading] = useState(true);
  //페이지네이션
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [searchCountry, setSearchCountry] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const [login_id, setLogin_id] = useState("*");
  const [sortBy, setSortBy] = useState("fromDate"); //정렬기준 - (기본값) writeDate, fromDate
  const [sort, setSort] = useState(1); //정렬차순 - (기본값)오름차순 : 1, 내림차순 : -1
  const [mypageList, setMypageList] = useState();
  const [needToReciveData, setNeedToReciveData] = useState(true);
  const existsessionStorage = sessionStorage.getItem("LOGINEDID");

  const [openPostModal, setOpenPostModal] = useState(false);
  const [modalData, setModalData] = useState();

  const [searchOption, setSearchOption] = useState("1");

  useLayoutEffect(() => {
    if (existsessionStorage) {
      setLogin_id(JSON.parse(sessionStorage.getItem("LOGINEDID")).value);
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
            setMypageList(res.data.mypageList);
            setNeedToReciveData(false);
            setLoading(false);
            setListCount(res.data.mypageList.length);
          })
          .catch((err) => console.log("에러발생" + err));
      }
    }
  }, [login_id, sortBy, mypageList, sort]);

  const openContentModal = (event) => {
    if (
      event.target !== event.currentTarget.children[1].children[5] &&
      event.target.parentElement !==
        event.currentTarget.children[1].children[5] &&
      event.target.parentElement.parentElement !==
        event.currentTarget.children[1].children[5]
    ) {
      setOpenPostModal(true);
      const modalData = {
        currentId: JSON.parse(sessionStorage.getItem("LOGINEDID")).value,
        post_id: event.currentTarget.children[0].textContent,
      };
      axios
        .post("api/post/getPostInfo", modalData)
        .then((response) => {
          setModalData(response.data.postInfo[0]);
        })
        .catch((error) => {
          console.log("데이터 탐색 에러 발생" + error);
        });
    }
  };

  const [listCount, setListCount] = useState(0);

  useEffect(() => {
    if (needToReciveData === false) {
      setListCount(
        mypageList.filter((data) =>
          data.country
            .toLocaleLowerCase()
            .includes(searchCountry.toLocaleLowerCase())
        ).length
      );
    }
  }, [mypageList, searchCountry, searchTitle, limit]);

  const mypageCountrySearchHandler = (event) => {
    setSearchCountry(event.target.value);
    setPage(1);
  };
  const mypageTitleSearchHandler = (event) => {
    setSearchTitle(event.target.value);
    setPage(1);
  };

  const sortByThis = (data) => {
    setSortBy(data);
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
      setOpenPostModal(false);
      alert("삭제를 취소합니다");
    }
  };

  const selectHandler = (event) => {
    setLimit(Number(event.target.value));
  };

  const searchBoxHandler = (event) => {
    setSearchOption(event.currentTarget.value);
  };

  return (
    <div className="myPage">
      {loading ? (
        <Loading />
      ) : (
        <div className="mypageContainer">
          <div className="myPageBtn">
            <select onChange={searchBoxHandler} value={searchOption}>
              <option value="1">여행국가</option>
              <option value="2">제목</option>
            </select>
            {searchOption === "1" && (
              <input
                type="text"
                value={searchCountry}
                onChange={mypageCountrySearchHandler}
                placeholder="여행국가 검색 (영어)"
              />
            )}
            {searchOption === "2" && (
              <input
                type="text"
                value={searchTitle}
                onChange={mypageTitleSearchHandler}
                placeholder="제목 검색"
              />
            )}
            <label>
              게시물 수&emsp;
              <select type="number" value={limit} onChange={selectHandler}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
              </select>
            </label>
          </div>
          <div className="myPageListContainer">
            {/* <ul className="myPageMenu">
              <li>사진</li>
              <li>여행국가</li>
              <li>제목</li>
              <li>
                여행기간
                <span>
                  <GoChevronUp
                    onClick={() => {
                      sorting(1);
                      sortByThis("fromDate");
                      setPage(1);
                    }}
                  />
                  <GoChevronDown
                    onClick={() => {
                      sorting(-1);
                      sortByThis("fromDate");
                      setPage(1);
                    }}
                  />
                </span>
              </li>
              <li>
                업로드일
                <span>
                  <GoChevronUp
                    onClick={() => {
                      sorting(1);
                      sortByThis("writeDate");
                    }}
                  />
                  <GoChevronDown
                    onClick={() => {
                      sorting(-1);
                      sortByThis("writeDate");
                    }}
                  />
                </span>
              </li>
              <li>수정/삭제</li>
            </ul> */}

            <div className="myPageMenu">
              <label>
                여행기간&emsp;
                <select type="text">
                  <option value="3">최신순</option>
                  <option value="6">오래된순</option>
                </select>
              </label>
              <label>
                작성일&emsp;
                <select type="text">
                  <option value="3">최신순</option>
                  <option value="6">오래된순</option>
                </select>
              </label>
            </div>
            <ul className="myPageList">
              {/* {mypageList ? (
                mypageList
                  .filter((data) => {
                    if (searchOption === "1") {
                      return data.country
                        .toLocaleLowerCase()
                        .includes(searchCountry.toLocaleLowerCase());
                    } else if (searchOption === "2") {
                      return data.title
                        .toLocaleLowerCase()
                        .includes(searchTitle.toLocaleLowerCase());
                    }
                  })
                  .slice(offset, offset + limit)
                  .map((data) => (
                    <li
                      className="mypageListLi"
                      onClick={openContentModal}
                      onKeyPress={openContentModal}
                      tabIndex="0"
                      aria-label="일지보기"
                      key={data._id}>
                      <span>{data._id}</span>
                      <ul className={mypageListLimitClass}>
                        <li>
                          <figure>
                            <img src={`/upload/${data.file[0]}`} alt="썸네일사진"/>
                            <img src={require("../../img/iu.jpg")} alt="썸네일사진"/>
                          </figure>
                        </li>
                        <li>{data.country}</li>
                        <li>{data.title}</li>
                        <li>
                          {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                          {new Date(data.toDate).toLocaleDateString()}
                        </li>
                        <li>{new Date(data.writeDate).toLocaleDateString()}</li>
                        <li>
                          <Link
                            to="/postEdit"
                            state={{
                              selectedCountry: data.country,
                              nationCode: data.nationCode,
                              _id: data._id,
                              writer: data.writer,
                            }}
                            aria-label="수정버튼">
                            <BiEdit />
                          </Link>
                          <a href="#" aria-label="삭제버튼">
                            <BiTrash onClick={() => postDeleteHandler(data)} />
                          </a>
                        </li>
                      </ul>
                    </li>
                  ))
              ) : (
                <div>작성된 글이 없습니다</div>
              )} */}
              {mypageList ? (
                mypageList
                  .filter((data) => {
                    if (searchOption === "1") {
                      return data.country
                        .toLocaleLowerCase()
                        .includes(searchCountry.toLocaleLowerCase());
                    } else if (searchOption === "2") {
                      return data.title
                        .toLocaleLowerCase()
                        .includes(searchTitle.toLocaleLowerCase());
                    }
                  })
                  .slice(offset, offset + limit)
                  .map((data) => (
                    <li className="mypageListLi" key={data._id}>
                      <span>{data._id}</span>
                      <h1>
                        <figure>
                          <img
                            src={`https://flagsapi.com/${data.nationCode}/flat/64.png`}
                            alt="국기"
                          />
                        </figure>
                        {data.country}
                      </h1>
                      <figure>
                        <img src={`/upload/${data.file[0]}`} alt="썸네일사진" />
                      </figure>
                      <h2>{data.title}</h2>
                      <h3 aria-label="여행기간">
                        <MdDateRange />
                        <span>
                          {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                          {new Date(data.toDate).toLocaleDateString()}
                        </span>
                      </h3>
                      <h4 aria-label="작성일">
                        {new Date(data.writeDate).toLocaleDateString()}
                      </h4>
                      <button
                        aria-label="자세히 보기"
                        onClick={openContentModal}
                        onKeyPress={openContentModal}>
                        <BsThreeDotsVertical />
                      </button>
                    </li>
                  ))
              ) : (
                <div>작성된 글이 없습니다</div>
              )}
            </ul>
          </div>
          <div className="myPagePagination">
            {mypageList ? (
              <div>
                <Pagination
                  total={listCount}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
      {openPostModal && (
        <ContentModal
          modalData={modalData}
          setOpenPostModal={setOpenPostModal}
        />
      )}
    </div>
  );
}

export default MyPage;

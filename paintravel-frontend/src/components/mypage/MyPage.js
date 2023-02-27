import React, { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";

import { BiEdit, BiTrash } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import ContentModal from "../post/ContentModal";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";
import "../../styles/mypage/mypage.scss";

import SelectCountryModal from "./SelectCountryModal.js";

function MyPage() {
  const [loading, setLoading] = useState(true);
  //페이지네이션
  const [limit, setLimit] = useState(8);
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

  //지역선택 후 글쓰기를 띄우기 위한 모달
  const [selectedCountryModal, setSelectedCountryModal] = useState(false);

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
    console.log(
      event.currentTarget.parentElement.parentElement.children[0].textContent
    );
    setOpenPostModal(true);
    const modalData = {
      currentId: JSON.parse(sessionStorage.getItem("LOGINEDID")).value,
      post_id:
        event.currentTarget.parentElement.parentElement.children[0].textContent,
    };
    axios
      .post("api/post/getPostInfo", modalData)
      .then((response) => {
        setModalData(response.data.postInfo[0]);
      })
      .catch((error) => {
        console.log("데이터 탐색 에러 발생" + error);
      });
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

  const selectHandler = (event) => {
    setLimit(Number(event.target.value));
  };

  const searchBoxHandler = (event) => {
    setSearchOption(event.currentTarget.value);
  };

  const openSelectCountryModal = () => {
    setSelectedCountryModal(true);
  };

  return (
    <div className="myPage">
      {loading ? (
        <Loading />
      ) : (
        <div className="mypageContainer">
          <div className="myPageBtn">
            <div className="postBtn">
              <a href="#selectCountryModal" onClick={openSelectCountryModal}>
                글쓰기
              </a>
              {selectedCountryModal && (
                <SelectCountryModal
                  setSelectedCountryModal={setSelectedCountryModal}
                  id="selectedCountryModal"
                />
              )}
            </div>
            <div className="myPageOption">
              <div>
                <span>
                  <select onChange={searchBoxHandler} value={searchOption}>
                    <option value="1">여행국가</option>
                    <option value="2">제목</option>
                  </select>
                  &nbsp;
                  <GoChevronDown />
                  &nbsp;
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
                </span>
                <label>
                  게시물 수&nbsp;
                  <GoChevronDown />
                  &nbsp;
                  <select type="number" value={limit} onChange={selectHandler}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  여행기간&nbsp;
                  <span>
                    <GoChevronUp
                      onClick={() => {
                        sorting(1);
                        sortByThis("fromDate");
                        setPage(1);
                      }}
                      onKeyPress={() => {
                        sorting(1);
                        sortByThis("fromDate");
                        setPage(1);
                      }}
                      title="최신순"
                      tabIndex="0"
                    />
                    <GoChevronDown
                      onClick={() => {
                        sorting(-1);
                        sortByThis("fromDate");
                        setPage(1);
                      }}
                      onKeyPress={() => {
                        sorting(-1);
                        sortByThis("fromDate");
                        setPage(1);
                      }}
                      title="오래된순"
                      tabIndex="0"
                    />
                  </span>
                </label>
                <label>
                  업로드일&nbsp;
                  <span>
                    <GoChevronUp
                      onClick={() => {
                        sorting(1);
                        sortByThis("writeDate");
                      }}
                      onKeyPress={() => {
                        sorting(1);
                        sortByThis("writeDate");
                      }}
                      title="최신순"
                      tabIndex="0"
                    />
                    <GoChevronDown
                      onClick={() => {
                        sorting(-1);
                        sortByThis("writeDate");
                      }}
                      onKeyPress={() => {
                        sorting(-1);
                        sortByThis("writeDate");
                      }}
                      title="오래된순"
                      tabIndex="0"
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="myPageListContainer">
            <ul className="myPageList">
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
                    <li
                      className="mypageListLi"
                      key={data._id}
                      // onClick={openContentModal}
                    >
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
                      <div>
                        <button
                          type="button"
                          aria-label="자세히 보기"
                          title="자세히 보기"
                          onClick={openContentModal}
                          onKeyPress={openContentModal}>
                          <BsThreeDotsVertical />
                        </button>
                      </div>
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentModal from "./ContentModal";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/post/contentList.scss";

import LoginButton from "./ContentList/LoginButton";
import EmptyList from "./ContentList/EmptyList";
import LoginedList from "./ContentList/LoginedList";

function ContentList({
  selectedCountry,
  nationCode,
  contentListClose,
  listData,
}) {
  console.log(nationCode + "dd");
  const [contentModal, setContentModal] = useState(false);
  const [contentModalStatus, setContentModalStatus] = useState(false);
  // const [loginedListData, setLoginedListData] = useState();

  const [existLocalStorage, setExistLocalStorage] = useState(false);
  useEffect(() => {
    if (window.localStorage.key("LOGINEDID")) {
      setExistLocalStorage(true);
    } else {
      setExistLocalStorage(false);
    }
    // setLoginedListData(listData);
  }, [listData]);

  const openContentModal = (event) => {
    setContentModal(true);
    setContentModalStatus(true);
    //해당 게시물의 디테일 정보를 가져올 get 연동 할 것들
    //axios.get(어쩌고 저쩌고)
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="contentContainer">
      <h1>다이어리 리스트</h1>
      <div className="contentHeader">
        <h2 className="selectedCountry">{selectedCountry}</h2>
        <div className="postButton">
          {existLocalStorage && (
            <Link
              to="/postwrite"
              state={{
                selectedCountry: selectedCountry,
                nationCode: nationCode,
              }}
              className="postButton">
              <span>다이어리 추가</span>+
            </Link>
          )}
        </div>
        <div className="backButton" onClick={contentListClose}>
          <span>리스트 닫기</span>
          <BiArrowBack />
        </div>
      </div>
      {/*null 자리에
        게시물이있다면(state 변수) ? <LoginedList openContentModal={openContentModal}/> : <EmptyList/> />
      */}
      {localStorage.key("LOGINEDID") ? (
        listData ? (
          <LoginedList
            openContentModal={openContentModal}
            listData={listData}
          />
        ) : (
          <EmptyList
            selectedCountry={selectedCountry}
            nationCode={nationCode}
          />
        )
      ) : (
        <LoginButton />
      )}
      {contentModal && (
        <ContentModal
          className="contentModal"
          setContentModal={setContentModal}
          setContentModalStatus={setContentModalStatus}
          contentModalStatus={contentModalStatus}
          cityName={cityName}
        />
      )}
    </div>
  );
}

export default ContentList;

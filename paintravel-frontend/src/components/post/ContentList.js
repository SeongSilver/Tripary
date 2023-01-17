import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  setVisitedCountry,
}) {
  const [existLocalStorage, setExistLocalStorage] = useState(false);
  useEffect(() => {
    if (window.localStorage.key("LOGINEDID")) {
      setExistLocalStorage(true);
    } else {
      setExistLocalStorage(false);
    }
    // setLoginedListData(listData);
  }, [listData]);

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
        listData &&
        (listData.length !== 0 ? (
          <LoginedList
            listData={listData}
            setVisitedCountry={setVisitedCountry}
          />
        ) : (
          <EmptyList
            selectedCountry={selectedCountry}
            nationCode={nationCode}
          />
        ))
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default ContentList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentModal from "./ContentModal";
import { BiArrowBack } from "react-icons/bi";
import "../../styles/post/contentList.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";

import LoginButton from "./ContentList/LoginButton";
import EmptyList from "./ContentList/EmptyList";
import LoginedList from "./ContentList/LoginedList";

function ContentList({ selectedCountry, nationCode, contentListClose }) {
  const [contentModal, setContentModal] = useState(false);
  const [contentModalStatus, setContentModalStatus] = useState(false);
  const [cityName, setCityName] = useState("서울인건가");

  //로그인 유무 확인
  // const dispatch = useDispatch();
  // const [isLogined, setIsLogined] = useState();

  //게시물 존재여부만 확인하는 더미 state
  const [existingPost, setExistingPost] = useState(true);

  const [existLocalStorage, setExistLocalStorage] = useState(false);
  useEffect(() => {
    if (window.localStorage.key("LOGINEDID")) {
      setExistLocalStorage(true);
    } else {
      setExistLocalStorage(false);
    }
  }, []);

  // useEffect(() => {
  //   dispatch(auth()).then((response) => {
  //     if (!response.payload.isAuth) {
  //       //로그인 안된 경우
  //       setIsLogined(false);
  //     } else {
  //       //로그인 된 경우
  //       setIsLogined(true);
  //     }
  //   });
  // }, []);

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
      {existLocalStorage ? (
        existingPost ? (
          <LoginedList
            openContentModal={openContentModal}
            selectedCountry={selectedCountry}
            nationCode={nationCode}
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

      {/* <LoginButton /> */}
      {/* <EmptyList/> */}
      {/* <LoginedList openContentModal={openContentModal} /> */}

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

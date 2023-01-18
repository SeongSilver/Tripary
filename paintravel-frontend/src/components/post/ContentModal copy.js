import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";

function ContentModal({
  contentModalStatus,
  setContentModalStatus,
  setContentModal,
  listData,
}) {
  const [modalOpenAnimation, setModalOpenAnimation] = useState("50vh");
  const [modalOpenOpacity, setModalOpenOpacity] = useState("0");
  const [modalBg, setModalBg] = useState("rgba(0, 0, 0, 0.7)");
  const [modalImgPosition, setModalImgPosition] = useState("0");
  const [modalCurrentSlide, setModalCurrentSlide] = useState(0);
  const [modalSlideBtn1st, setModalSlideBtn1st] = useState({
    backgroundColor: "#000",
  });
  const [modalSlideBtn2nd, setModalSlideBtn2nd] = useState({
    backgroundColor: "#999",
  });
  const [modalSlideBtn3rd, setModalSlideBtn3rd] = useState({
    backgroundColor: "#999",
  });
  const [modalSlideBtn4th, setModalSlideBtn4th] = useState({
    backgroundColor: "#999",
  });
  
  useEffect(() => {
    if (contentModalStatus) {
      setModalOpenAnimation("7.5vh");
      setModalOpenOpacity("1");
    }
    setModalImgPosition(-modalCurrentSlide * 100);
    if (modalCurrentSlide == 0) {
      setModalSlideBtn1st({ backgroundColor: "#000" });
      setModalSlideBtn2nd({ backgroundColor: "#999" });
      setModalSlideBtn3rd({ backgroundColor: "#999" });
      setModalSlideBtn4th({ backgroundColor: "#999" });
    } else if (modalCurrentSlide == 1) {
      setModalSlideBtn1st({ backgroundColor: "#999" });
      setModalSlideBtn2nd({ backgroundColor: "#000" });
      setModalSlideBtn3rd({ backgroundColor: "#999" });
      setModalSlideBtn4th({ backgroundColor: "#999" });
    } else if (modalCurrentSlide == 2) {
      setModalSlideBtn1st({ backgroundColor: "#999" });
      setModalSlideBtn2nd({ backgroundColor: "#999" });
      setModalSlideBtn3rd({ backgroundColor: "#000" });
      setModalSlideBtn4th({ backgroundColor: "#999" });
    } else if (modalCurrentSlide == 3) {
      setModalSlideBtn1st({ backgroundColor: "#999" });
      setModalSlideBtn2nd({ backgroundColor: "#999" });
      setModalSlideBtn3rd({ backgroundColor: "#999" });
      setModalSlideBtn4th({ backgroundColor: "#000" });
    }
  }, [modalCurrentSlide]);
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const closeModal = () => {
    setModalOpenAnimation("50vh");
    setModalOpenOpacity("0");
    setContentModalStatus(false);
    setModalBg("transparent");
    setTimeout(() => {
      setContentModal(false);
      setModalBg("rgba(0, 0, 0, 0.7)");
    }, 200);
  };
  // 슬라이드 animation 이전 버튼
  const imgSlidePre = () => {
    if (modalCurrentSlide <= 0) {
      setModalCurrentSlide(0);
    } else {
      setModalCurrentSlide(modalCurrentSlide - 1);
    }
  };

  // 슬라이드 animation 이후 버튼
  const imgSlideNext = () => {
    if (modalCurrentSlide >= 3) {
      setModalCurrentSlide(3);
    } else {
      setModalCurrentSlide(modalCurrentSlide + 1);
    }
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="modalContainer" style={{ background: `${modalBg}` }}>
      <div
        className="modalDiv"
        style={{
          top: `${modalOpenAnimation}`,
          opacity: `${modalOpenOpacity}`,
        }}>
        <div className="modalHeader">
          {/* <h1>{cityName}</h1> */}
          <h2>제목!!!! oo이랑 같이 다녀온 부산 여행~</h2>
        </div>
        <ul className="modalBody">
          <li
            style={{ transform: "translateX(" + `${modalImgPosition}` + "%)" }}>
            <img src={require("../../img/login/loginBg.jpg")} />
          </li>
          <li
            style={{ transform: "translateX(" + `${modalImgPosition}` + "%)" }}>
            <img src={require("../../img/mypage/mypageBg.png")} />
          </li>
          <li
            style={{ transform: "translateX(" + `${modalImgPosition}` + "%)" }}>
            <img src={require("../../img/login/loginBg.jpg")} />
          </li>
          <li
            style={{ transform: "translateX(" + `${modalImgPosition}` + "%)" }}>
            <img src={require("../../img/mypage/mypageBg.png")} />
          </li>
        </ul>
        <ol className="modalPagination">
          <li onClick={imgSlidePre}>
            <span>이전</span>
            <a href="#">&#60;</a>
          </li>
          <li>
            <a
              href="#"
              style={modalSlideBtn1st}
              onClick={() => {
                setModalCurrentSlide(0);
              }}></a>
          </li>
          <li>
            <a
              href="#"
              style={modalSlideBtn2nd}
              onClick={() => {
                setModalCurrentSlide(1);
              }}></a>
          </li>
          <li>
            <a
              href="#"
              style={modalSlideBtn3rd}
              onClick={() => {
                setModalCurrentSlide(2);
              }}></a>
          </li>
          <li>
            <a
              href="#"
              style={modalSlideBtn4th}
              onClick={() => {
                setModalCurrentSlide(3);
              }}></a>
          </li>
          <li onClick={imgSlideNext}>
            <span>다음</span>
            <a href="#">&#62;</a>
          </li>
        </ol>
        <Link to="#" onClick={closeModal}>
          <span>닫기</span>x
        </Link>
      </div>
    </div>
  );
}

export default ContentModal;

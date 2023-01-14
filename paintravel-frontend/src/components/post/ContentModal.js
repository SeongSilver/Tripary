import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

function ContentModal({ data, setCheck }) {
  const closeModal = () => {
    setCheck(false);
  };
  const [modalImgPosition, setModalImgPosition] = useState("0");
  const [modalCurrentSlide, setModalCurrentSlide] = useState(0);
  const [modalSlideBtn1st, setModalSlideBtn1st] = useState({backgroundColor: "#000"});
  const [modalSlideBtn2nd, setModalSlideBtn2nd] = useState({backgroundColor: "#999"});
  const [modalSlideBtn3rd, setModalSlideBtn3rd] = useState({backgroundColor: "#999"});
  const [modalSlideBtn4th, setModalSlideBtn4th] = useState({backgroundColor: "#999"});
  // 슬라이드 animation 이전 버튼
  const imgSlidePre = () => {
    if (modalCurrentSlide <= 0) {
      setModalCurrentSlide(0);
    } else {
      setModalCurrentSlide(modalCurrentSlide - 1);
    }
  };

  // 슬라이드 animation 다음 버튼
  const imgSlideNext = () => {
    if (modalCurrentSlide >= 3) {
      setModalCurrentSlide(3);
    } else {
      setModalCurrentSlide(modalCurrentSlide + 1);
    }
  };
  console.log(data.file);

  useEffect(() => {
    // if (contentModalStatus) {
    //   setModalOpenAnimation("7.5vh");
    //   setModalOpenOpacity("1");
    // }
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
  return (
    <div className="modalContainer">
      <div className="modalDiv">
        <div className="modalHeader">
        {/* <h1>{cityName}</h1> */}
        {/* <h2>{data.title}</h2> */}
        {/* </div> */}
        <h1>{data.title}</h1>
        <h2>{data.location}</h2>
        </div>
        <div className="modalBody">
          <ul>
            {data.file.map((image, index) => 
              <li key={index} style={{ transform: "translateX(" + `${modalImgPosition}` + "%)" }}>
                <img src={`/upload/${image}`} alt="이미지"/>
                <img src={`/upload/${image}`} alt="이미지 배경"/>
              </li>
            )}
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
          <pre>{data.content}<br/>스크롤<br/>테스트용<br/>글<br/>쓰<br/>기</pre>
        </div>
        <Link
          to="/postEdit" className="postEditBtn"
          state={{
            selectedCountry: data.country,
            nationCode: data.nationCode,
            _id: data._id,
            writer: data.writer,
          }}>
          <span>수정</span>
          <BiEdit/>
        </Link>
        <a href="#" onClick={closeModal} className="modalCloseBtn">
          <span>닫기</span>
          <AiFillCloseCircle/>
        </a>
      </div>
    </div>
  );
}

export default ContentModal;

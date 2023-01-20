import React, { useState, useEffect } from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import Loading from "../common/Loading";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ContentModal({ modalData, setCheck }) {
  // console.log(modalData);
  const closeModal = () => {
    setCheck(false);
  };

  const postDeleteHandler = () => {
    const deletePostInfo = {
      currentId: modalData.writer,
      post_id: modalData._id,
    };
    const reloadVisitedData = {
      currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
    };
    console.log(deletePostInfo);
    axios
      .post("api/post/getPostDelete", deletePostInfo)
      .then((response) => {
        console.log("게시물 삭제 성공");
        console.log(response);
        location.reload();
      })
      .catch((error) => {
        console.log("게시물 삭제 실패");
        console.log(error);
      });
  };

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {!modalData ? (
        <Loading />
      ) : (
        <div className="modalContainer">
          <div className="modalDiv">
            <div className="modalHeader">
              {/* <h1>{cityName}</h1> */}
              {/* <h2>{modalData.title}</h2> */}
              {/* </div> */}
              <h1>{modalData.title}</h1>
              <h2>{modalData.location}</h2>
              <a href="#" onClick={closeModal} className="modalCloseBtn">
                <span>닫기</span>
                <AiFillCloseCircle />
              </a>
            </div>
            <div className="modalBody">
              <Slider {...slickSettings}>
                {modalData.file.map((image, index) => (
                  <div className="slideImageContariner" key={index}>
                    <img
                      src={`/upload/${image}`}
                      alt="이미지"
                      width={"200px"}
                      height={"150px"}
                    />
                    {/* <img src={`/upload/${image}`} alt="이미지 배경" /> */}
                  </div>
                ))}
              </Slider>
              <pre>{modalData.content}</pre>
            </div>
            <div className="modalFooter">
              <Link
                to="/postEdit"
                className="postEditBtn"
                state={{
                  selectedCountry: modalData.country,
                  nationCode: modalData.nationCode,
                  _id: modalData._id,
                  writer: modalData.writer,
                }}>
                수정하기
                <BiEdit />
              </Link>
              <button
                className="postEditBtn"
                onClick={postDeleteHandler}
                style={{ zIndex: "999", cursor: "pointer" }}>
                삭제하기
                <BiTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentModal;

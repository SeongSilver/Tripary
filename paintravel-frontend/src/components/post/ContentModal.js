import React from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";
import { AiFillCloseCircle, AiOutlineMinus } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import Loading from "../common/Loading";
import axios from "axios";
import Slider from "react-slick";
import "../../styles/post/modalSlickCarousel/slick-theme.css";
import "../../styles/post/modalSlickCarousel/slick.css";

function ContentModal({ modalData, setOpenPostModal }) {
  const closeModal = () => {
    setOpenPostModal(false);
  };

  const postDeleteHandler = () => {
    const deletePostInfo = {
      currentId: modalData.writer,
      post_id: modalData._id,
    };
    // const reloadVisitedData = {
    //   currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
    // };
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
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
    } else {
      alert("삭제를 취소합니다");
    }
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
            <div className="closeBtn">
              <a href="#" onClick={closeModal} className="modalCloseBtn">
                <AiFillCloseCircle
                  style={{ color: "#343434", fontSize: "30px" }}
                />
              </a>
            </div>
            <div className="modalHeader">
              <h1>{modalData.title}</h1>
              <hr />
              <div className="modalHeaderBottom">
                <h2>{modalData.location}</h2>
                <div className="modalDate">
                  <h2>{new Date(modalData.fromDate).toLocaleDateString()}</h2>
                  &emsp;~&emsp;
                  <h2>{new Date(modalData.toDate).toLocaleDateString()}</h2>
                </div>
              </div>
            </div>
            <div className="modalBody">
              <Slider {...slickSettings}>
                {modalData.file.map((image, index) => (
                  <div key={index}>
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
              <button type="button" className="editBtn">
                <Link
                  to="/postEdit"
                  className="postEditBtn"
                  state={{
                    selectedCountry: modalData.country,
                    nationCode: modalData.nationCode,
                    _id: modalData._id,
                    writer: modalData.writer,
                  }}>
                  수정하기&nbsp;
                  <BiEdit />
                </Link>
              </button>
              <button
                type="button"
                className="deleteBtn"
                onClick={postDeleteHandler}
                style={{ zIndex: "999", cursor: "pointer" }}>
                삭제하기&nbsp;
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

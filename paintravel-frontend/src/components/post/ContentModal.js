import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";

function ContentModal({ data, setCheck }) {
  const closeModal = () => {
    setCheck(false);
  };
  // 슬라이드 animation 이전 버튼
  console.log(data.file);

  return (
    <div className="modalContainer">
      <div className="modalDiv">
        {/* <div className="modalHeader"> */}
        {/* <h1>{cityName}</h1> */}
        <h2>{data.title}</h2>
        {/* </div> */}
        {data.title}
        {data.location}
        {data.content}
        <ul className="modalBody">
          {data.file.map((image, index) => {
            <li key={index}>
              <img src={`/upload/${image}`} />
            </li>;
          })}
        </ul>
        <Link
          to="/postEdit"
          state={{
            selectedCountry: data.country,
            nationCode: data.nationCode,
            _id: data._id,
            writer: data.writer,
          }}>
          <button>수정</button>
        </Link>
        <button onClick={closeModal}>닫아줘</button>
      </div>
    </div>
  );
}

export default ContentModal;

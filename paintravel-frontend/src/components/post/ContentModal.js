import React, { useState, useEffect, useLayoutEffect } from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";

function ContentModal({ data, setCheck }) {
  const closeModal = () => {
    setCheck(false);
  };
  // 슬라이드 animation 이전 버튼

  return (
    <div className="modalContainer">
      <div className="modalDiv">
        제발 모달좀 나와줘라
        {data.file.map((image, id) => {
          <div key={id}>
            <img src={`/upload/${image}`} alt={`${image} - ${id}`} />
          </div>;
        })}
        {data.title}
        {data.location}
        {data.content}
        <button onClick={closeModal}>닫아줘</button>
      </div>
    </div>
  );
}

export default ContentModal;

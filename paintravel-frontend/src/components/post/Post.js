import React from "react";
import "../../styles/post/postWrite.scss";

function Post() {
  return (
  <div className="postWriteContainer">
    <div className="postWrite">
      <h1>Diary</h1>
      <form className="postWriteWrap">
        <div className="gallery">
          <h2>Gallery</h2>
          <label htmlFor="galleryUpload">+</label>
          <input type="file" id="galleryUpload"></input>
          <div className="galleryContainer">

          </div>
        </div>
        <ul>
          <li>
            <p>위치</p>
            <input type="text"></input>
          </li>
          <li>
            <p>일정</p>
            <input type="date"></input>
            <span>~</span>
            <input type="date"></input>
          </li>
          <li>
            <p>일기</p>
            <textarea></textarea>
          </li>
        </ul>
        <div className="postWriteBtn">
          <button type="submit">등록</button>
          <button type="cancel">취소</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Post;

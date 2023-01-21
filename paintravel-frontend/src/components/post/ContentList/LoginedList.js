import React, { useState } from "react";
import ContentModal from "../ContentModal";
import axios from "axios";

function LoginedList({ listData }) {
  const [check, setCheck] = useState(false);
  const [modalData, setModalData] = useState();

  const openContentModal = (event) => {
    setCheck(true);
    console.log(event.currentTarget.children[0].textContent);
    const modalData = {
      currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
      post_id: event.currentTarget.children[0].textContent,
    };

    axios
      .post("api/post/getPostInfo", modalData)
      .then((response) => {
        console.log("데이터 탐색 성공");
        console.log(response.data);
        setModalData(response.data.postInfo[0]);
      })
      .catch((error) => {
        console.log("데이터 탐색 에러 발생");
      });
  };
  return (
    // <div className="contentBody">하하</div>
    <ul className="contentBody">
      {listData &&
        listData.map((data) => (
          <li
            className="contentCard"
            key={data._id}
            value={data._id}
            onClick={openContentModal}>
            <span className="dummyId">{data._id}</span>
            <span className="cardTag">{data.location}</span>
            <div>
              <img
                className="contentImage"
                src={`/upload/${data.file[0]}`}
                alt={data._id}
              />
            </div>
            <p className="cardDate">
              {new Date(data.fromDate).toLocaleDateString()} ~{" "}
              {new Date(data.toDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      {check && <ContentModal modalData={modalData} setCheck={setCheck} />}
    </ul>
  );
}

export default LoginedList;

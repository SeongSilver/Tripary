import React, { useState } from "react";
import ContentModal from "../ContentModal";
import axios from "axios";

function LoginedList({ listData }) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [modalData, setModalData] = useState();

  const openContentModal = (event) => {
    setOpenPostModal(true);
    const modalData = {
      currentId: JSON.parse(localStorage.getItem("LOGINEDID")).value,
      post_id: event.currentTarget.children[0].children[0].textContent,
    };

    axios
      .post("api/post/getPostInfo", modalData)
      .then((response) => {
        setModalData(response.data.postInfo[0]);
      })
      .catch((error) => {
        console.log("데이터 탐색 에러 발생" + error);
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
            <a href="#">
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
            </a>
          </li>
        ))}
      {openPostModal && (
        <ContentModal
          modalData={modalData}
          setOpenPostModal={setOpenPostModal}
        />
      )}
    </ul>
  );
}

export default LoginedList;

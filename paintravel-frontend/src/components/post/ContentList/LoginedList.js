import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentModal from "../ContentModal";

function LoginedList({ listData }) {
  const [contentModal, setContentModal] = useState(false);

  const openContentModal = () => {
    setContentModal(true);
  };

  return (
    // <div className="contentBody">하하</div>
    <ul className="contentBody">
      {listData &&
        listData.map(
          (data) => (
            <li className="contentCard" key={data._id}>
              <span className="cardTag">{data.location}</span>
              <div>
                <img className="contentImage" src={`/img/${data.file[0]}`} />
              </div>
              <p className="cardDate">
                {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                {new Date(data.toDate).toLocaleDateString()}
              </p>
            </li>
          )
          // <ContentModal setContentModal={setContentModal} />
        )}
    </ul>
  );
}

export default LoginedList;

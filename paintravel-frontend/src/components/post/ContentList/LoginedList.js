import React from "react";
import { Link } from "react-router-dom";

function LoginedList({ openContentModal, listData }) {
  console.log(typeof listData[1].fromDate);
  return (
    // <div className="contentBody">하하</div>
    <ul className="contentBody">
      {listData &&
        listData.map((data) => (
          <li className="contentCard">
            <span className="cardTag">{data.location}</span>
            <div>
              <img className="contentImage" src={`/img/${data.file[0]}`} />
            </div>
            <p className="cardDate">
              {new Date(data.fromDate).toLocaleDateString()} ~{" "}
              {new Date(data.toDate).toLocaleDateString()}
            </p>
            <Link to="#" onClick={openContentModal}>
              일기 자세히 보기
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default LoginedList;

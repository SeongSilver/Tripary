import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentModal from "../ContentModal";

function LoginedList({ listData }) {
  const [check, setCheck] = useState(false);

  const openContentModal = () => {
    setCheck(true);
  };
  return (
    // <div className="contentBody">하하</div>
    <ul className="contentBody">
      {listData &&
        listData.map((data) => (
          <li className="contentCard" key={data._id}>
            <span className="cardTag">{data.location}</span>
            {/* <Link
              to="/postEdit"
              state={{
                selectedCountry: data.country,
                nationCode: data.nationCode,
                _id: data._id,
                writer: data.writer,
              }}>
              <div>
                <img className="contentImage" src={`/upload/${data.file[0]}`} />
              </div>
            </Link> */}
            <div onClick={openContentModal}>
              <img className="contentImage" src={`/upload/${data.file[0]}`} />
            </div>
            <p className="cardDate">
              {new Date(data.fromDate).toLocaleDateString()} ~{" "}
              {new Date(data.toDate).toLocaleDateString()}
            </p>
            {check && <ContentModal data={data} setCheck={setCheck} />}
          </li>
        ))}
    </ul>
  );
}

export default LoginedList;

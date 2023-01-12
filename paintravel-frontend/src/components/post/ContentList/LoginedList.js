import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentModal from "../ContentModal";

function LoginedList({ listData }) {
  const [contentModal, setContentModal] = useState(false);
  const [contentModalStatus, setContentModalStatus] = useState(false);

  const openContentModal = () => {
    setContentModal(true);
  };
  console.log(listData[0])
  return (
    // <div className="contentBody">하하</div>
    <ul className="contentBody">
      {listData &&
        listData.map(
          (data) => (
            <li className="contentCard" key={data._id}>
              <span className="cardTag">{data.location}</span>
              <Link
                to="/postEdit"
                state={{
                  selectedCountry: data.country,
                  nationCode: data.nationCode,
                  _id: data._id,
                  writer : data.writer
              }}>
                <div>
                  <img className="contentImage" src={`/upload/${data.file[0]}`} />
                </div>
              </Link>
              <p className="cardDate">
                {new Date(data.fromDate).toLocaleDateString()} ~{" "}
                {new Date(data.toDate).toLocaleDateString()}
              </p>
              {/* {contentModal && <ContentModal contentModalStatus={contentModalStatus} setContentModalStatus={setContentModalStatus} setContentModal={ setContentModal}  listData={data} />} */}
            </li>
          )
          )}
    </ul>
  );
}

export default LoginedList;

import React from "react";
import "../../styles/common/loading.scss";
import Spinner from "../../img/common/loading.gif";

const Loading = () => {
  return (
    <div className="background">
      <div className="loadingText">잠시만 기다려 주세요.</div>
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};
export default Loading;

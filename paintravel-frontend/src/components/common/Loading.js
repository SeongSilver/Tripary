import React from "react";
import "../../styles/common/loading.scss";
import Spinner from "../../img/common/loading.gif";

const Loading = () => {
  return (
    <div className="background">
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};
export default Loading;

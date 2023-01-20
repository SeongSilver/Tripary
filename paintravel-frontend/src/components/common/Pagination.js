import React from "react";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import "../../styles/common/pagination.scss";

function Pagination({ total, limit, page, setPage }) {
  console.log(total, limit, page);
  const numPages = Number(Math.ceil(total / limit));
  return (
    <>
      <div className="pageContainer">
        <button
          className="pageBtn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || page < 1}>
          <RiArrowLeftSFill />
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <span
              className="pageBtn"
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}>
              {i + 1}
            </span>
          ))}
        <button
          className="pageBtn"
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}>
          <RiArrowRightSFill />
        </button>
      </div>
    </>
  );
}

export default Pagination;

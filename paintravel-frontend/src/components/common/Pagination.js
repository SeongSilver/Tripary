import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "../../styles/common/pagination.scss";

function Pagination({ total, limit, page, setPage }) {
  console.log(total, limit, page);
  const numPages = Number(Math.ceil(total / limit));
  return (
    <>
      <div className="pageContainer">
        <span
          className="pageBtn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}>
          <BiLeftArrow />
        </span>
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
        <span
          className="pageBtn"
          onClick={() => setPage(page + 1)}
          //   disabled={page === numPages}
        >
          <BiRightArrow />
        </span>
      </div>
    </>
  );
}

export default Pagination;

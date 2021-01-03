import React, { useState } from "react";
import s from "./Pagination.module.css";
import cn from "classnames";

const Pagination = ({
  totalUserCount,
  pageSize,
  portionSize = 10,
  currentPage,
  onPageChanged,
}: any) => {
  let pagesCount = Math.ceil(totalUserCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={cn(s.paginator)}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p: any) => {
          return (
            <span
              className={cn(
                { [s.selectedPage]: currentPage === p },
                s.pageNumber
              )}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {" "}
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;

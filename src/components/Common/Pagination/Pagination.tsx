import React, { useState } from "react";
import s from "./Pagination.module.css";
import cn from "classnames";

type PaginationProps = {
  totalUserCount: number;
  pageSize: number;
  portionSize?: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalUserCount,
  pageSize,
  portionSize = 10,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUserCount / pageSize);
  let pages: Array<number> = [];
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
        .map((p) => {
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

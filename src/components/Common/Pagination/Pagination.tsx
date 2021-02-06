import React, { useState } from "react";
import s from "./Pagination.module.css";
import cn from "classnames";
import { Button } from "antd";

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
        <Button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </Button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <Button
              type={"primary"}
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
            </Button>
          );
        })}
      {portionCount > portionNumber && (
        <Button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;

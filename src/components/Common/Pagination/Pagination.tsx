import React, {useState} from 'react';
import s from "./Pagination.module.css";

const Pagination = ({totalUserCount,pageSize,portionSize = 10 ,currentPage,onPageChanged}:any) => {

debugger
    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
            <div>
                {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p: any) => {
                    // @ts-ignore
                    return <span className={currentPage === p && s.selectedPage} onClick={() => {
                        onPageChanged(p)
                    }}> {p}</span>
                })}
                {portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>
                }
            </div>
    )
}

export default Pagination
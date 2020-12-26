import React from 'react';
import s from "./Pagination.module.css";

const Pagination = ({totalUserCount,pageSize,currentPage,onPageChanged}:any) => {


    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
            <div>
                {pages.map((p: any) => {
                    // @ts-ignore
                    return <span className={currentPage === p && s.selectedPage} onClick={() => {
                        onPageChanged(p)
                    }}> {p}</span>
                })}

            </div>
    )
}

export default Pagination
import React from 'react';
import s from "./users.module.css";
import userPhoto from "../../assets/img/image.jpg";
import {NavLink} from "react-router-dom";

let Users = (props: any) => {
    debugger

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (
        <div>
            <div>
                {pages.map((p: any) => {
                    // @ts-ignore
                    return <span className={props.currentPage === p && s.selectedPage} onClick={(e) => {
                        props.onPageChanged(p)
                    }}> {p}</span>
                })}

            </div>
            {props.users.map((u: any) => <div key={u.id}>
                <span>
                <div>
                    <NavLink to={"/profile/"+ u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="#" className={s.usersPhoto}/>
                    </NavLink>
                    </div>
                <div>
                    {u.followed ?
                        <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                        <button onClick={() => props.follow(u.id)}>Follow</button>}

                </div>
                </span>
                    <span>
                    <div>{u.name}</div><div>{u.status}</div>
                </span>
                    <span>
                    {/*<div>{u.location.country}</div>*/}
                        {/*<div>{u.location.city}</div>*/}
                </span>
                </div>
            )}
        </div>
    )
}

export default Users
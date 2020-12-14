import React from 'react';
import s from "./users.module.css";
import userPhoto from "../../assets/img/image.jpg";
import {NavLink} from "react-router-dom";
import axios from "axios";

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
                    {u.followed
                        ? <button disabled={props.followingInProgress} onClick={() => {
                            props.setFollowingProgress(true, u.id)
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                withCredentials: true,
                                headers: {
                                    "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9"
                                }
                            })
                                .then((response) => {
                                    if(response.data.resultCode === 0){
                                        props.unfollow(u.id)
                                    }
                                    props.setFollowingProgress(false, u.id)
                                })

                        }}>Unfollow</button>

                        : <button disabled={props.followingInProgress.some((id:number) => id === u.id)} onClick={() => {
                            props.setFollowingProgress(true, u.id)
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},{
                                withCredentials: true,
                                headers: {
                                    "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9"
                                }
                            })
                                .then((response) => {
                                    if(response.data.resultCode === 0){
                                        props.follow(u.id)
                                    }
                                    props.setFollowingProgress(false, u.id)
                                })
                        }}>Follow</button>}

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
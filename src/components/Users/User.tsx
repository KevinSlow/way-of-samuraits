import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/img/image.jpg";
import { NavLink } from "react-router-dom";
import UsersPagination from "../Common/Pagination/Pagination";
import { UserType } from "../../types/types";
import { Button } from "antd";

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

let User: React.FC<PropsType> = ({
  user,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div key={user.id}>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt="#"
              className={s.usersPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <Button
              disabled={followingInProgress.some((id: any) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              disabled={followingInProgress.some((id: any) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </Button>
          )}
        </div>
      </span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
      <span>
        {/*<div>{u.location.country}</div>*/}
        {/*<div>{u.location.city}</div>*/}
      </span>
    </div>
  );
};

export default User;

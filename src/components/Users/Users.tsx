import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/img/image.jpg";
import { NavLink } from "react-router-dom";
import UsersPagination from "../Common/Pagination/Pagination";
import User from "./User";

let Users = ({
  followingInProgress,
  users,
  currentPage,
  pageSize,
  totalUserCount,
  onPageChanged,
  ...props
}: any) => {
  const eight = 8;

  return (
    <div>
      <UsersPagination
        totalUserCount={totalUserCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u: any) => (
          <User
            key={u.id}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={followingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;

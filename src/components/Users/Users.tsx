import React from "react";
import UsersPagination from "../Common/Pagination/Pagination";
import User from "./User";
import { UserPropsContainerType } from "./UsersContainer";
import { PostType } from "../../redux/store";

type UsersPropsType = {
  followingInProgress: () => void;
  users: PostType[];
  currentPage: number;
  pageSize: number;
  totalUserCount: number;
  onPageChanged: (pageNumber: number) => void;
  follow: () => void;
  unfollow: () => void;
};

let Users = ({
  followingInProgress,
  users,
  currentPage,
  pageSize,
  totalUserCount,
  onPageChanged,
  ...props
}: UsersPropsType) => {
  return (
    <div>
      <UsersPagination
        totalUserCount={totalUserCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u: { id: number }) => (
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

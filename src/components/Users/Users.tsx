import React from "react";
import UsersPagination from "../Common/Pagination/Pagination";
import User from "./User";
import { UserType } from "../../types/types";

type UsersPropsType = {
  followingInProgress: Array<number>;
  users: UserType[];
  currentPage: number;
  pageSize: number;
  totalUserCount: number;
  onPageChanged: (pageNumber: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

let Users: React.FC<UsersPropsType> = ({
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

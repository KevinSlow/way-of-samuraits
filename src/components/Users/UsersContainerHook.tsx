import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  follow,
  requestUsers,
  setCurrentPage,
  setFollowingProgress,
  unfollow,
} from "../../redux/usersReducer";
import Users from "./Users";
import PreLoader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsers,
} from "../../redux/users-selectors";
import { PostType } from "../../redux/store";
import { StateType } from "../../types/types";

export interface UserPropsContainerType {
  currentPage: number;
  pageSize: number;
  getUsers: (currentPage: number, pageSize: number) => void;
  isFetching: boolean;
  users: PostType[];
  totalUserCount: number;
  follow: () => void;
  unfollow: () => void;
  followingInProgress: () => void;
}

const UsersContainer = ({ ...restProps }) => {
  useEffect(restProps.getUsers(restProps.currentPage, restProps.pageSize), [
    restProps.currentPage,
    restProps.pageSize,
  ]);

  function onPageChanged(pageNumber: number) {
    let { pageSize } = restProps;
    restProps.getUsers(pageNumber, pageSize);
  }

  return (
    <Users
      totalUserCount={restProps.totalUserCount}
      pageSize={restProps.pageSize}
      currentPage={restProps.currentPage}
      onPageChanged={restProps.onPageChanged}
      users={restProps.users}
      follow={restProps.follow}
      unfollow={restProps.unfollow}
      followingInProgress={restProps.followingInProgress}
    />
  );
};

let mapStateToProps = (state: StateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose<any>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingProgress,
    getUsers: requestUsers,
  })
)(UsersContainer);

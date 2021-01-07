import React from "react";
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
import { PostType, StateType } from "../../redux/store";

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

class UsersContainer extends React.Component<UserPropsContainerType> {
  componentDidMount() {
    let { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    let { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render(): JSX.Element {
    return (
      <>
        {this.props.isFetching ? (
          <PreLoader />
        ) : (
          <Users
            totalUserCount={this.props.totalUserCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

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

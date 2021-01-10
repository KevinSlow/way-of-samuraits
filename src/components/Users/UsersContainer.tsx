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
import { StateType, UserType } from "../../types/types";
import { ThunkDispatch } from "redux-thunk";

type MapStateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUserCount: number;
  users: UserType[];
  followingInProgress: number[];
};

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

export type UserPropsContainerType = MapStateToPropsType &
  MapDispatchPropsType &
  OwnPropsType;

class UsersContainer extends React.Component<
  UserPropsContainerType,
  StateType
> {
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
        <h2>{this.props.pageTitle}</h2>
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

let mapStateToProps = (state: StateType): MapStateToPropsType => {
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
  connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, StateType>(
    mapStateToProps,
    {
      follow,
      unfollow: unfollow,
      getUsers: requestUsers,
    }
  )
)(UsersContainer);

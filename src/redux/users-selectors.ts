import { createSelector } from "reselect";
import { StateType } from "../types/types";

const getUsersSelector = (state: StateType) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state: StateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUserCount = (state: StateType) => {
  return state.usersPage.totalUserCount;
};

export const getCurrentPage = (state: StateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: StateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: StateType) => {
  return state.usersPage.followingInProgress;
};

import { updateObjectInArray } from "../hoc/objectsHelpers";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  AppState,
  DispatchType,
  IActionRecucerType,
  StateType,
  UserType,
} from "../types/types";
import { Dispatch } from "react";

import { usersAPI } from "../api/usersAPI";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SET_USERS":
      return { ...state, users: action.users };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };

    case "SET_TOTAL_USERS_COUNT":
      return { ...state, totalUserCount: action.count };

    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };

    case "TOGGLE_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
  }
  return state;
};

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage: currentPage,
    } as const),
  setTotalUserCount: (totalUserCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      count: totalUserCount,
    } as const),
  setIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  setFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.setIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUserCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.setFollowingProgress(true, userId));
  let response = await apiMethod(userId);

  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.setFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.followUsers.bind(usersAPI),
      actions.followSuccess
    );
  };
};
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowUsers.bind(usersAPI),
      actions.unfollowSuccess
    );
  };
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;

export default usersReducer;

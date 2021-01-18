import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../hoc/objectsHelpers";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  AppState,
  DispatchType,
  IActionRecucerType,
  photosType,
  StateType,
  UserType,
} from "../types/types";
import { Dispatch } from "react";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

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
  action: ActionTypes
): InitialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUserCount: action.count };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
  }
  return state;
};

type GetStateType = () => StateType;
type DispatchTypes = Dispatch<ActionTypes>;
type ThunkType = ThunkAction<void, AppState, unknown, ActionTypes>;
type ActionTypes =
  | ActionTypefollowSuccess
  | ActionTypeunfollowSuccess
  | ActionTypeSetUsers
  | ActionTypeSetCurrentPage
  | ActionTypeSetTotalUserCount
  | ActionTypeSetIsFetching
  | ActionTypeSetFollowingProgress;

type ActionTypefollowSuccess = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): ActionTypefollowSuccess => ({
  type: FOLLOW,
  userId,
});

type ActionTypeunfollowSuccess = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): ActionTypeunfollowSuccess => ({
  type: UNFOLLOW,
  userId,
});

type ActionTypeSetUsers = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): ActionTypeSetUsers => ({
  type: SET_USERS,
  users,
});

type ActionTypeSetCurrentPage = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (
  currentPage: number
): ActionTypeSetCurrentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage: currentPage,
});

type ActionTypeSetTotalUserCount = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setTotalUserCount = (
  totalUserCount: number
): ActionTypeSetTotalUserCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUserCount,
});

type ActionTypeSetIsFetching = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const setIsFetching = (
  isFetching: boolean
): ActionTypeSetIsFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ActionTypeSetFollowingProgress = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const setFollowingProgress = (
  isFetching: boolean,
  userId: number
): ActionTypeSetFollowingProgress => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return (dispatch, getState) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));

    usersAPI.getUsers(page, pageSize).then((data) => {
      dispatch(setIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUserCount(data.totalCount));
    });
  };
};
type UnfollowFollowAction = ActionTypefollowSuccess | ActionTypeunfollowSuccess;
const _followUnfollowFlow = async (
  dispatch: DispatchTypes,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => UnfollowFollowAction
) => {
  dispatch(setFollowingProgress(true, userId));
  let response = await apiMethod(userId);

  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch: DispatchTypes) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.followUsers.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowUsers.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;

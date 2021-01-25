import { updateObjectInArray } from "../hoc/objectsHelpers";
import { UserType } from "../types/types";
import { Dispatch } from "react";

import { usersAPI } from "../api/usersAPI";
import { BaseThunkType, InferActionsTypes, StateType } from "./reduxStore";
import { APIResponseType, ResultCodesEnum } from "../api/api";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
  photos: {
    small: null,
    large: null,
  },
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SN/USERS/SET_USERS":
      return { ...state, users: action.users };

    case "SN/USERS/SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };

    case "SN/USERS/SET_TOTAL_USERS_COUNT":
      return { ...state, totalUserCount: action.count };

    case "SN/USERS/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };

    case "SN/USERS/TOGGLE_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    case "SN/USERS/SET_FILTER": {
      return { ...state, filter: action.payload };
    }
  }
  return state;
};

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "SN/USERS/FOLLOW",
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: "SN/USERS/UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "SN/USERS/SET_USERS",
      users,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      currentPage: currentPage,
    } as const),
  setFilter: (filter: FilterType) =>
    ({ type: "SN/USERS/SET_FILTER", payload: filter } as const),
  setTotalUserCount: (totalUserCount: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS_COUNT",
      count: totalUserCount,
    } as const),
  setIsFetching: (isFetching: boolean) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  setFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "SN/USERS/TOGGLE_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export const requestUsers = (
  page: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    debugger;
    dispatch(actions.setFilter(filter));

    let data = await usersAPI.getUsers(
      page,
      pageSize,
      filter.term,
      filter.friend
    );

    dispatch(actions.setIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUserCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.setFollowingProgress(true, userId));
  let response = await apiMethod(userId);

  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.setFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    );
  };
};
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    );
  };
};

export const getUsersFilter = (state: StateType) => {
  return state.usersPage.filter;
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;
export type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter;

export default usersReducer;

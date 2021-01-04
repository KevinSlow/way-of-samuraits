import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../hoc/objectsHelpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

let initialStates = {
  users: [
    {
      name: "ILICH",
      id: 13543,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: "anniemt6",
      id: 13542,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true,
    },
    {
      name: "DimaAleks",
      id: 13541,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true,
    },
    {
      name: "KirJS",
      id: 13540,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true,
    },
    {
      name: "Kir",
      id: 13539,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
  ],
  pageSize: 5,
  totalUserCount: 8551,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};
type profileReducerType = {
  newPostText: string;
  posts: Array<PostType>;
};

type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

interface FollowType {
  type: "FOLLOW";
  userId: number;
}

interface UnfollowType {
  type: "UNFOLLOW";
  userId: number;
}

interface SetUsersType {
  type: "SET_USERS";
  users: string;
}

interface ToggleIsFetchingType {
  type: "TOGGLE_IS_FETCHING";
  isFetching: boolean;
}

type SetCurrentPageType = {
  type: "SET_CURRENT_PAGE";
  currentPage: number;
};

type ToggleFollowingInProgressType = {
  type: "TOGGLE_FOLLOWING_PROGRESS";
  isFetching: boolean;
  userId: number;
};

type SetUsersTotalCountType = {
  type: "SET_TOTAL_USERS_COUNT";
  count: number;
};

export type UsersAction =
  | FollowType
  | UnfollowType
  | SetUsersType
  | ToggleIsFetchingType
  | SetCurrentPageType
  | ToggleFollowingInProgressType
  | SetUsersTotalCountType;

const usersReducer = (state = initialStates, action: UsersAction) => {
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

export const followSuccess = (userId: number) => ({
  type: FOLLOW,
  userId,
});

export const unfollowSuccess = (userId: number) => ({
  type: UNFOLLOW,
  userId,
});

export const setUsers = (users: any) => ({
  type: SET_USERS,
  users,
});

export const setCurrentPage = (currentPage: any) => ({
  type: SET_CURRENT_PAGE,
  currentPage: currentPage,
});

export const setTotalUserCount = (setTotalUserCount: any) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: setTotalUserCount,
});

export const setIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setFollowingProgress = (isFetching: boolean, userId: number) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (page: number, pageSize: number) => {
  return (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));

    usersAPI.getUsers(page, pageSize).then((data) => {
      dispatch(setIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUserCount(data.totalCount));
    });
  };
};

const _followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: (userId: number) => Promise<any>,
  actionCreator: (userId: number) => any
) => {
  dispatch(setFollowingProgress(true, userId));
  let response = await apiMethod(userId);

  if (response.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId: number): any => {
  return async (dispatch: any) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.followUsers.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId: number): any => {
  return async (dispatch: any) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowUsers.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;

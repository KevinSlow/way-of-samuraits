import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  AppState,
  DispatchType,
  photosType,
  ProfileType,
  StateType,
  ThunkType,
} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

const initialState = {
  posts: [
    { id: 1, message: "Hi", likesCount: 10 },
    { id: 2, message: "How is your day?", likesCount: 20 },
    { id: 3, message: "Fine, tahnks", likesCount: 0 },
    { id: 4, message: "Svetlana", likesCount: 50 },
    { id: 5, message: "Trysa", likesCount: 100 },
    { id: 6, message: "Fine", likesCount: 3 },
  ],
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type initialStateType = typeof initialState;

interface ChangeNewTextActionType {
  type: "ADD-POST";
  newText: string;
}

type SetUserProfileType = {
  type: "SET_USER_PROFILE";
  profile: null;
};

type SetStatusType = {
  type: "SET_STATUS";
  status: string;
};

type SetPhotoType = {
  type: "SAVE_PHOTO_SUCCESS";
  profile: null;
};

type DeletePostType = {
  type: "DELETE_POST";
  postId: number;
};

export type ProfileAction =
  | addPostActionCreatorType
  | setUserProfileSuccessType
  | DeletePostType
  | SetStatusType
  | savePhotoSuccessType;

const profileReducer = (
  state: initialStateType = initialState,
  action: ProfileAction
) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
  }
  return state;
};

type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (
  newPostText: string
): addPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type setUserProfileSuccessType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfileSuccess = (
  profile: ProfileType
): setUserProfileSuccessType => ({
  type: SET_USER_PROFILE,
  profile,
});

export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: photosType;
};

export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

// -----------
// Redux-Thunk for async query
// -----------

type ThunksType = ThunkAction<void, AppState, unknown, ProfileAction>;

export const setUserProfile = (userId: number | null): ThunksType => async (
  dispatch: DispatchType
) => {
  const response = await usersAPI.getUsersProfile(userId);
  dispatch(setUserProfileSuccess(response.data));
};

export const getStatus = (userId: number): ThunksType => async (
  dispatch: DispatchType
) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string): ThunksType => async (
  dispatch: DispatchType
) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    alert(error);
  }
};

export const savePhoto = (file: string): ThunksType => async (
  dispatch: DispatchType
) => {
  const response = await profileAPI.savePhoto(file);

  if (response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos));
  }
};

export const saveProfile = (profile: ProfileType) => async (
  dispatch: DispatchType,
  getState: () => StateType
) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.resultCode === 0) {
    dispatch(setUserProfile(userId));
  } else {
    // dispatch(stopSubmit("edit-profile", {"contacts" : {"facebook": response.messages[0]}}))
    dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }));
    return Promise.reject(response.messages[0]);
  }
};

export default profileReducer;

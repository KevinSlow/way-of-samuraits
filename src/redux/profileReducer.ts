import { FormAction, stopSubmit } from "redux-form";
import { AppState, PhotosType, ProfileType, StateType } from "../types/types";
import { profileAPI } from "../api/profileAPI";
import store, {
  ActionsType,
  BaseThunkType,
  InferActionsTypes,
} from "./reduxStore";

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

const profileReducer = (
  state: initialStateType = initialState,
  action: ProfileAction
) => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
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

    case "SN/PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SN/PROFILE/SET_USER_PROFILE": {
      return { ...state, profile: action.profile };
    }

    case "SN/PROFILE/DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case "SN/PROFILE/SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
  }
  return state;
};

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD-POST",
      newPostText,
    } as const),
  setUserProfileSuccess: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};
// -----------
// Redux-Thunk for async query
// -----------

export const setUserProfile = (userId: number | null): ThunksType => async (
  dispatch
) => {
  const data = await profileAPI.getUsersProfile(userId);
  dispatch(actions.setUserProfileSuccess(data));
};

export const getStatus = (userId: number): ThunksType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunksType => async (
  dispatch
) => {
  try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    alert(error);
  }
};

export const savePhoto = (file: File): ThunksType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunksType => async (
  dispatch
) => {
  const userId = store.getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(setUserProfile(userId));
    } else {
      throw new Error("userId can't be null");
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export type initialStateType = typeof initialState;
export type ProfileAction = InferActionsTypes<typeof actions>;
type ThunksType = BaseThunkType<ActionsType | FormAction>;

export default profileReducer;

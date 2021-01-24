import store from "../redux/reduxStore";

export type DispatchType = typeof store.dispatch;
export interface IActionRecucerType {
  type: string;
  newPostText: string;
  status: string;
  profile: null;
  postId: number;
  userId: number;
  users: number[];
  currentPage: number;
  count: number;
  isFetching: boolean;
  newMessageBody: string;
  dialogId: number;
}

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  aboutMe: string;
  lookingForAJob: string;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type UserType = {
  id: number;
  name: string;
  uniqueUrlName: string | null;
  photos: PhotosType;
  status: string | null;
  followed: boolean;
};
export type MessageType = {
  id: number;
  message: string;
};
export type DialogType = {
  id: number;
  name: string;
};

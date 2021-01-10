import profileReducer, { ProfileAction } from "./profileReducer";

import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

type MessageType = {
  id: number;
  message: string;
};
type DialogType = {
  id: number;
  name: string;
};

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type sideBar = {
  id: number;
  name: string;
  imgUrl: string;
};

export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
  profile: null;
  status: string;
};

export type DialogPageType = {
  messages: MessageType[];
  dialogs: DialogType[];
};

export type sideBarType = {
  friends: sideBar[];
};

export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogPageType;
  sideBar: sideBarType;
  usersPage: null;
};

export type RootStoreType = {
  _state: RootStateType;
  _callSubscriber: () => void;
  getState: () => RootStateType;
  subscribe: (observer: () => void) => void;
  dispatch: (action: any) => void;
};

let store: RootStoreType = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi", likesCount: 10 },
        { id: 2, message: "How is your day?", likesCount: 20 },
        { id: 3, message: "Fine, tahnks", likesCount: 0 },
        { id: 4, message: "Svetlana", likesCount: 50 },
        { id: 5, message: "Trysa", likesCount: 100 },
        { id: 6, message: "Fine", likesCount: 3 },
      ],
      newPostText: "it-kamasutra.com!",
      profile: null,
      status: "",
    },
    dialogsPage: {
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your day?" },
        { id: 3, message: "Fine, tahnks" },
        { id: 4, message: "Svetlana" },
        { id: 5, message: "Trysa" },
        { id: 6, message: "Fine" },
      ],
      dialogs: [
        { id: 1, name: "Dimich123" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Valera" },
        { id: 4, name: "Sveta" },
        { id: 5, name: "Polina" },
        { id: 6, name: "Sasha" },
      ],
    },
    sideBar: {
      friends: [
        {
          id: 1,
          name: "Kiril",
          imgUrl:
            "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
        },
        {
          id: 2,
          name: "Ivan",
          imgUrl:
            "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
        },
        {
          id: 3,
          name: "Petrovich",
          imgUrl:
            "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
        },
      ],
    },
    usersPage: null,
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log("State changed");
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch: function (action: any) {
    let { profilePage, dialogsPage, sideBar } = this._state;
    profileReducer(profilePage, action);
    dialogsReducer(dialogsPage, action);
    sidebarReducer(sideBar, action);
    this._callSubscriber();
  },
};

export default store;
// window.store = store;

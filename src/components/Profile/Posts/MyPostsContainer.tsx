import React from "react";
import { addPostActionCreator } from "../../../redux/profileReducer";
import { RootStoreType } from "../../../redux/store";
import { connect } from "react-redux";
import Profile from "../Profile";
import MyPosts, { PostType } from "./MyPosts";
import { DispatchType, StateType } from "../../../types/types";

type myPostsContainerPropsType = {
  store: RootStoreType;
};

type MapStateToProps = {
  post: Array<PostType>;
  newPostText: string;
};

type MapDispatchToProps = {
  addPosts: (newPostText: string) => void;
};

const mapStateToProps = (state: StateType): MapStateToProps => {
  return {
    post: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch: DispatchType): MapDispatchToProps => {
  return {
    addPosts: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

const MyPostsContainer: any = connect<
  MapStateToProps,
  unknown,
  MapDispatchToProps,
  StateType
>(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;

import React from "react";
import { RootStoreType } from "../../../redux/_store";
import { connect } from "react-redux";
import Profile from "../Profile";
import MyPosts from "./MyPosts";
import { PostType } from "../../../types/types";
import { actions } from "../../../redux/profileReducer";
import { StateType } from "../../../redux/reduxStore";

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
  } as MapStateToProps;
};

const MyPostsContainer = connect<
  MapStateToProps,
  MapDispatchToProps,
  {},
  StateType
>(mapStateToProps, { addPosts: actions.addPostAction })(MyPosts);

export default MyPostsContainer;

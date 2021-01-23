import React from "react";
import { RootStoreType } from "../../../redux/_store";
import { connect } from "react-redux";
import Profile from "../Profile";
import MyPosts, { PostType } from "./MyPosts";
import { StateType } from "../../../types/types";
import { actions } from "../../../redux/profileReducer";

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

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => {
  return {
    addPosts: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText));
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

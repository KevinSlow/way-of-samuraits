import React from "react";
import Post from "./Post/Post";
import { AddPostFormValuesType, MyPost } from "./MyPost";
import { PostType } from "../../../types/types";

export type MapPropsType = {
  post: Array<PostType>;
};
export type DispatchPropsType = {
  addPosts: (newPostText: string) => void;
};
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo(
  (props) => {
    let postsElements = props.post.map((p) => {
      return <Post message={p.message} likesCount={p.likesCount} id={p.id} />;
    });
    const onSubmit = (values: AddPostFormValuesType) => {
      props.addPosts(values.newPostText);
    };
    return (
      <div>
        <MyPost onSubmit={onSubmit} newPostText={""} />
        <div>{postsElements}</div>
      </div>
    );
  }
);

export default MyPosts;

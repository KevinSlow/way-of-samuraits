import React from "react";
import Post from "./Post/Post";
import { MyPost } from "./MyPost";

export type MyPostsPropsType = {
  post: Array<PostType>;
  addPosts: (newPostText: string) => void;
  updateNewPostText: (text: string) => void;
};

export type PostType = {
  message: string;
  likesCount: number;
};

const MyPosts = React.memo((props: MyPostsPropsType) => {
  let postsElements = props.post.map((p) => {
    return <Post message={p.message} likesCount={p.likesCount} />;
  });
  const onSubmit = (values: any) => {
    props.addPosts(values.newPostText);
  };
  return (
    <div>
      <MyPost onSubmit={onSubmit} elements={postsElements} />
    </div>
  );
});

export default MyPosts;

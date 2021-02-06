import React from "react";
import s from "./Post.module.css";
import { PostType } from "../../../../types/types";

const Post = (props: PostType) => {
  return (
    <div className={s.item} key={props.id}>
      <img
        src="https://scontent-iev1-1.xx.fbcdn.net/v/t1.0-1/s320x320/79515135_10111007623880301_5111576226921709568_o.jpg?_nc_cat=1&ccb=2&_nc_sid=7206a8&_nc_ohc=mxG7b1NaBW8AX9WDBHa&_nc_ht=scontent-iev1-1.xx&tp=7&oh=6d7c5fda78fa67cf7b4724ff55b2ada8&oe=603827AD"
        alt=""
      />
      {props.message}
      <div>
        <span>Like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;

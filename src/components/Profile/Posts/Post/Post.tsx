import React from "react";
import s from './Post.module.css';
import {PostType} from "../MyPosts";

const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img
                src="https://scontent.fiev13-1.fna.fbcdn.net/v/t1.0-1/s320x320/79515135_10111007623880301_5111576226921709568_o.jpg?_nc_cat=1&ccb=2&_nc_sid=7206a8&_nc_ohc=0lzloRNQk5cAX_v-G_b&_nc_ht=scontent.fiev13-1.fna&tp=7&oh=04022734a046621ca05c6f9c6bb207f4&oe=5FF8DFAD"
                alt=""/>
            {props.message}
            <div>
                <span>Like</span> {props.likesCount}
            </div>
        </div>
    );
}

export default Post;
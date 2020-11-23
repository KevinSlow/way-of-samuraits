import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";

export type MyPostsPropsType = {
    post: Array<PostType>,
    newPostText: string,
    dispatch: (action: any) => void
}

export type PostType = {
    message: string,
    likesCount: number,
}





const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.post.map((p) => <Post message={p.message} likesCount={p.likesCount}/>)


    let newPostElement: any = React.createRef();

    let addPosts = () => {
        try {
            props.dispatch(addPostActionCreator());
        } catch (e) {
            alert('Ошибка ' + e.name + ":" + e.message);
        }
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }

    return (
        <div>
            <div className={s.postsBlock}>
                <h3>New Post</h3>
                <div>
                    <div>
                        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                    </div>
                    <div>
                        <button onClick={addPosts}>Add Post</button>
                    </div>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
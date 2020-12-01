import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

export type MyPostsPropsType = {
    post: Array<PostType>,
    addPosts: () => void,
    newPostText: string
    updateNewPostText: (text: string) => void,
}


export type PostType = {
    message: string,
    likesCount: number,
}





const MyPosts = (props: MyPostsPropsType) => {



    let postsElements = props.post.map((p) => <Post message={p.message} likesCount={p.likesCount}/>)


    let newPostElement: any = React.createRef();

    let onAddPosts = () => {
        debugger
        // try {
            props.addPosts();
            //
        // } catch (e) {
        //     alert('Ошибка ' + e.name + ":" + e.message);
        // }
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
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
                        <button onClick={onAddPosts}>Add Post</button>
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
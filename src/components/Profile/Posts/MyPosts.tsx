import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

type MyPostsPropsType = {
    post: Array<PostType>,
    addPosts: (txt:string) => typeof txt , //////??????????????????/
}

export type PostType = {
    message: string,
    likesCount: number,
}






const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.post.map( (p) => <Post  message={p.message} likesCount={p.likesCount}/>)


    let newPostElement: any = React.createRef();   //////?????????????????//

    let addPosts = () => {
        let txt = newPostElement.current.value;
        try{
            props.addPosts(txt);
            newPostElement.current.value = "";
        } catch(e){
            alert('Ошибка ' + e.name + ":" + e.message);
        }
    };

    return (
        <div>
            <div className={s.postsBlock}>
                <h3>New Post</h3>
                <div>
                    <div>
                        <textarea ref={newPostElement}></textarea>
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
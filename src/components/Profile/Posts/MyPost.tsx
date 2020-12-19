import s from "./MyPosts.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";


const AddPost = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"newPostText"} component={"textarea"}/>
            <button>Add Post</button>
        </form>
    )
}

const ReduxAddPost = reduxForm({
    form: "add-post"
})(AddPost)


export function MyPost(props: { onSubmit: (values: any) => void, elements: JSX.Element[] }) {
    return <>
        <div className={s.postsBlock}>
            <h3>New Post</h3>
            <ReduxAddPost onSubmit={props.onSubmit}/>
        </div>
        <div>
            {props.elements}
        </div>
    </>;
}
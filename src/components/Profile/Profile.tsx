import React from "react";
import s from './Profile.module.css';
import MyPosts, {MyPostsPropsType} from "./Posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";



type ProfilePostType = {
    state: ProfilePageType,
    dispatch: (action: any) => void,
}

const Profile = (props: ProfilePostType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                newPostText={props.state.newPostText}
                post={props.state.posts}
                dispatch={props.dispatch}/>
        </div>
    );
}

export default Profile;
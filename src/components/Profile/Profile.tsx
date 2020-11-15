import React from "react";
import s from './Profile.module.css';
import MyPosts from "./Posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile = (props: any) => { /////???//
    return (
        <div>
            <ProfileInfo/>
            <MyPosts post={props.state.posts} addPosts={props.addPosts}/>
        </div>
    );
}

export default Profile;
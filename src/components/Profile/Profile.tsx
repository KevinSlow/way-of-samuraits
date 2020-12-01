import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import {Action} from "../../redux/profileReducer";
import {ProfilePageType, RootStoreType} from "../../redux/store";
import MyPostsContainer from "./Posts/MyPostsContainer";




const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
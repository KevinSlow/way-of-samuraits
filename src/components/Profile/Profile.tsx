import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./Posts/MyPostsContainer";
import { Redirect } from "react-router-dom";
import { ProfileContainerType } from "./ProfileContainer";
import { ProfileType } from "../../types/types";

type Profile = {
  isOwner: boolean;
  status: string;
  updateStatus: () => void;
  savePhoto: () => void;
};

type ProfileTypeProps = {
  setUserProfile: (userId: number | null) => void;
  getStatus: (userId: number) => void;
  savePhoto: () => void;
  updateStatus: () => void;
  status: string;
  saveProfile: () => void;
  isOwner: boolean;
  profile: ProfileType;
};

const Profile = (props: ProfileTypeProps) => {
  return (
    <div>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

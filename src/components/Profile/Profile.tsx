import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./Posts/MyPostsContainer";

import { ProfileType } from "../../types/types";

type Profile = {
  isOwner: boolean;
  status: string;
  updateStatus: () => void;
  savePhoto: () => void;
};

type ProfileTypeProps = {
  setUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  savePhoto: (file: File) => void;
  updateStatus: (status: string) => void;
  status: string;
  saveProfile: (Profile: ProfileType) => Promise<any>;
  isOwner: boolean;
  profile: ProfileType | null;
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

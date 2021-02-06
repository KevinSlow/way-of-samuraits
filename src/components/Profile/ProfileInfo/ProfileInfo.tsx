import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.css";
import PreLoader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/image.jpg";
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import { Button, Input, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  savePhoto,
  isOwner,
  status,
  updateStatus,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <PreLoader />;
  }

  const onMainPhotoSelected = (file: RcFile) => {
    savePhoto(file);
    return userPhoto;
  };
  const photoUpload = {
    action: userPhoto,
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
      showRemoveIcon: true,
    },
  };
  /*const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };*/

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {/*<div>*/}
      {/*    <img src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt=""/>*/}
      {/*</div>*/}
      <img
        className={s.mainPhoto}
        src={profile.photos.large || userPhoto}
        alt=""
      />
      {isOwner && (
        // <Upload action={onMainPhotoSelected}>
        //   <Button>Upload Directory</Button>
        // </Upload>
        <Upload action={onMainPhotoSelected} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )}
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      {editMode ? (
        <ProfileDataForm
          profile={profile}
          initialValues={profile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          goToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  goToEditMode,
  ...props
}) => {
  return (
    <div className={s.descriptionBlock}>
      {isOwner && (
        <div>
          <Button onClick={goToEditMode}>edit</Button>
        </div>
      )}
      <div>
        Full Name
        <div>{profile.fullName}</div>
      </div>
      <div>
        About Me
        <div>{profile.aboutMe}</div>
      </div>
      <div>
        {profile.lookingForAJob && (
          <div>
            lookingForAJobDescription{" "}
            <div>{profile.lookingForAJobDescription}</div>
          </div>
        )}
      </div>
      <div>
        Looking for a Job: <div>{profile.lookingForAJob ? "Yes" : "No"}</div>
      </div>
      <div>
        <div>
          <b>Contacts:</b> :{" "}
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contacts
                contactTitle={key}
                contactValue={profile.contacts[key as keyof ContactsType]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contacts: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b> : {contactValue}
    </div>
  );
};

export default ProfileInfo;

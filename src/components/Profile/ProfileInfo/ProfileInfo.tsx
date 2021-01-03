import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.css";
import PreLoader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/image.jpg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  savePhoto,
  isOwner,
  status,
  updateStatus,
  saveProfile,
}: any) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <PreLoader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: any) => {
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
      {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      {editMode ? (
        <ProfileDataForm
          // @ts-ignore
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

const ProfileData = ({ profile, isOwner, goToEditMode, ...props }: any) => {
  return (
    <div className={s.descriptionBlock}>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
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
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Contacts = ({ contactTitle, contactValue }: any) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b> : {contactValue}
    </div>
  );
};

export default ProfileInfo;

import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import PreLoader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/image.jpg";
const ProfileInfo = ({profile,savePhoto,isOwner,status,updateStatus}:any) => {
    if(!profile){
        return <PreLoader/>
    }

    const mainPhotoSelected = (e:any) => {
        if(e.current.files.length){
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt=""/>*/}
            {/*</div>*/}

            <div className={s.descriptionBlock} >
                <img className={s.mainPhoto} src={profile.photos.large || userPhoto} alt=""/>
                {isOwner && <input type={"file"}  onChange={mainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                <div>
                    <div>{profile.aboutMe}</div>
                </div>
                <div>
                    Social Network
                    <ul>
                        <a href={"#"}>{profile.contacts.facebook}</a>
                        <li>{profile.contacts.website ? profile.contacts.website : "nothing here"}</li>
                        <li>{profile.contacts.vk ? profile.contacts.vk : "nothing here"}</li>
                        <li>{profile.contacts.twitter ? profile.contacts.twitter : "nothing here"}</li>
                        <li>{profile.contacts.instagram ? profile.contacts.instagram : "nothing here"}</li>
                        <li>{profile.contacts.youtube ? profile.contacts.youtube : "nothing here"}</li>
                        <li>{profile.contacts.github ? profile.contacts.github : "nothing here"}</li>
                        <li>{profile.contacts.mainLink ? profile.contacts.mainLink : "nothing here"}</li>
                    </ul>
                </div>
                <div>
                    Looking for a Job
                    <div>{profile.lookingForAJob ? "Yes" : "No"}</div>
                </div>
                <div>
                    lookingForAJobDescription
                    <div>{profile.lookingForAJobDescription}</div>
                </div>
                <div>
                    Full Name
                    <div>{profile.fullName}</div>
                </div>
                ava+description
            </div>
        </div>
    );
}

export default ProfileInfo;
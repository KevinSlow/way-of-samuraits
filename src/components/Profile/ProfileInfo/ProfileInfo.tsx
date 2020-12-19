import React from "react";
import s from './ProfileInfo.module.css';
import PreLoader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props: any) => {
    if(!props.profile){
        return <PreLoader/>
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <img src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt=""/>*/}
            {/*</div>*/}

            <div className={s.descriptionBlock} >
                <img src={props.profile.photos.large} alt=""/>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                <div>
                    <div>{props.profile.aboutMe}</div>
                </div>
                <div>
                    Social Network
                    <ul>
                        <a href={"#"}>{props.profile.contacts.facebook}</a>
                        <li>{props.profile.contacts.website ? props.profile.contacts.website : "nothing here"}</li>
                        <li>{props.profile.contacts.vk ? props.profile.contacts.vk : "nothing here"}</li>
                        <li>{props.profile.contacts.twitter ? props.profile.contacts.twitter : "nothing here"}</li>
                        <li>{props.profile.contacts.instagram ? props.profile.contacts.instagram : "nothing here"}</li>
                        <li>{props.profile.contacts.youtube ? props.profile.contacts.youtube : "nothing here"}</li>
                        <li>{props.profile.contacts.github ? props.profile.contacts.github : "nothing here"}</li>
                        <li>{props.profile.contacts.mainLink ? props.profile.contacts.mainLink : "nothing here"}</li>
                    </ul>
                </div>
                <div>
                    Looking for a Job
                    <div>{props.profile.lookingForAJob ? "Yes" : "No"}</div>
                </div>
                <div>
                    lookingForAJobDescription
                    <div>{props.profile.lookingForAJobDescription}</div>
                </div>
                <div>
                    Full Name
                    <div>{props.profile.fullName}</div>
                </div>
                ava+description
            </div>
        </div>
    );
}

export default ProfileInfo;
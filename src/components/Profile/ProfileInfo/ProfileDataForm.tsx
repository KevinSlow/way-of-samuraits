import React from "react";
import s from "./ProfileInfo.module.css";
import lg from "../../Common/FormsControls/FormsControls.module.css";
import {CreateField, Input, TextArea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({profile,handleSubmit,error}: any) => {

    return <form onSubmit={handleSubmit} className={s.descriptionBlock}>
        <div><button>save</button></div>
        {error && <div className={lg.formSummaryError}>
            {error}
        </div>}
        <div> Full Name <div>{CreateField("Full name", "fullName", [], Input)}</div></div>
        {/*<div>{profile.aboutMe}</div>*/}

          <div>Looking for a Job {CreateField("", "lookingForAJob", [], Input, {type: "checkbox"})}</div>

        <div>
            <b>My proffesional skills:</b>
            {CreateField("My proffesional skills", "lookingForAJobDescription", [], TextArea)}
        </div>

        <div>About Me: </div>
        {CreateField("About Me", "aboutMe", [], TextArea)}
        <div>
            <div>
                <b>Contacts:</b> : {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <strong>{key}: {CreateField(key, "contacts." + key, [], Input)}</strong>
                </div>
            })}
            </div>
        </div>
    </form>
}


const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm)
export default ProfileDataFormReduxForm
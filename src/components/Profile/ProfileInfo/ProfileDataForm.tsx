import React from "react";
import s from "./ProfileInfo.module.css";
import lg from "../../Common/FormsControls/FormsControls.module.css";
import {
  CreateField,
  GetStringKeys,
  Input,
  TextArea,
} from "../../Common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../types/types";

type PropsTypes = {
  profile: ProfileType;
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsTypes> & PropsTypes
> = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className={s.descriptionBlock}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={lg.formSummaryError}>{error}</div>}
      <div>
        {" "}
        Full Name{" "}
        <div>
          {CreateField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
      </div>
      {/*<div>{profile.aboutMe}</div>*/}

      <div>
        Looking for a Job{" "}
        {CreateField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {
          type: "checkbox",
        })}
      </div>

      <div>
        <b>My proffesional skills:</b>
        {CreateField<ProfileTypeKeys>(
          "My proffesional skills",
          "lookingForAJobDescription",
          [],
          TextArea
        )}
      </div>

      <div>About Me: </div>
      {CreateField<ProfileTypeKeys>("About Me", "aboutMe", [], TextArea)}
      <div>
        <div>
          <b>Contacts:</b> :{" "}
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                <strong>
                  {key}: {CreateField(key, "contacts." + key, [], Input)}
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsTypes>({
  form: "edit-profile",
})(ProfileDataForm);
export default ProfileDataFormReduxForm;

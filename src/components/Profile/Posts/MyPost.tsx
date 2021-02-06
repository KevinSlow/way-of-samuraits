import s from "./MyPosts.module.css";
import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/Validators/validators";
import {
  CreateField,
  GetStringKeys,
  TextArea,
} from "../../Common/FormsControls/FormsControls";
import { Button } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const maxLength10 = maxLengthCreator(10);
type PropsType = {
  onSubmit: (values: AddPostFormValuesType) => void;
};
export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormTypeKeys = GetStringKeys<AddPostFormValuesType>;
const AddPost: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  debugger;
  return (
    <form onSubmit={props.handleSubmit}>
      {CreateField<AddPostFormTypeKeys>(
        "Post Message",
        "newPostText",
        [required, maxLength10],
        TextArea
      )}
      <Button htmlType={"submit"}>Add Post</Button>
    </form>
  );
};

const ReduxAddPost = reduxForm<AddPostFormValuesType, PropsType>({
  form: "add-post",
})(AddPost);

export const MyPost: React.FC<AddPostFormValuesType & PropsType> = (props) => {
  return (
    <>
      <div className={s.postsBlock}>
        <h3>New Post</h3>
        <ReduxAddPost onSubmit={props.onSubmit} />
      </div>
    </>
  );
};

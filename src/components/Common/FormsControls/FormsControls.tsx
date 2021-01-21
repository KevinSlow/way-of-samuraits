import React from "react";
import s from "./FormsControls.module.css";
import {
  FieldValidatorType,
  required,
} from "../../../utils/Validators/validators";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;

  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div>{children}</div>
      <span>{hasError && error}</span>
    </div>
  );
};

export type TextAreaTypes = {};

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
export type LoginFormPropertiesType =
  | "email"
  | "password"
  | "rememberMe"
  | "captcha"
  | "fullName"
  | "lookingForAJob"
  | "lookingForAJobDescription"
  | "aboutMe"
  | "contacts"
  | "string";

export function CreateField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: FieldValidatorType[],
  component: React.FC<WrappedFieldProps>,
  restProps = {},
  text = ""
) {
  return (
    <div>
      <Field
        type="text"
        validate={validators}
        name={name}
        placeholder={placeholder}
        component={component}
        {...restProps}
      />{" "}
      {text}
    </div>
  );
}

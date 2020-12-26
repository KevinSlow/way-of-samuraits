import React from "react";
import s from "./FormsControls.module.css"
import {required} from "../../../utils/Validators/validators";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}: any) => {
    const hasError = touched && error;

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            <span>{hasError && error}</span>
        </div>
    )
}


export const TextArea = (props: any) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props} >
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}


export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props} >
            <input {...input} {...restProps} />
        </FormControl>
    )
}


export const CreateField = (placeholder :string, name: string, validators: any, component: any, restProps = {}, text = "") => {
    return <div><Field
        type="text"
        validate={validators}
        name={name}
        placeholder={placeholder}
        component={component}
        {...restProps}
    /> {text}</div>
};
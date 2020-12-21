import React from "react";
import s from "./FormsControls.module.css"

const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            <span>{hasError && meta.error}</span>
        </div>
    )
}


const TextArea = (props: any) => {
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


export default TextArea;
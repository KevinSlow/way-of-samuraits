import React from "react";
import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/Validators/validators";
import { connect } from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../Common/FormsControls/FormsControls.module.css"


const LoginForm = ({handleSubmit,error,captchaUrl,...restProps}: any) => {

    return (
        <form onSubmit={handleSubmit}>
                {CreateField("email", "email",[required],Input,{type: "text"} )}
                {CreateField("password", "password",[required],Input,{type: "password"} ) }
                {CreateField("", "rememberMe",[],Input, {type: "checkbox"}, "remember Me" )}


            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && CreateField("Symbols from image", "captcha", [required],Input, {} )}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<any,any>(
    {form: 'login'}
)(LoginForm)

const Login = (props:any) => {
    const onSubmit = (formData: any) => {
        console.log(formData)

        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>

}

const mapStateToProps = (state: any) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login)
import React from "react";
import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/Validators/validators";
import { connect } from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../Common/FormsControls/FormsControls.module.css"


const LoginForm = ({handleSubmit,error}: { handleSubmit: any, error: string }) => {
    return (
        <form onSubmit={handleSubmit}>
                {CreateField("email", "email",[required],Input,{type: "text"} )}
                {CreateField("password", "password",[required],Input,{type: "password"} ) }
                {CreateField("", "password",null,Input, {type: "checkbox"}, "remember Me" )}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm(
    {form: 'login'}
)(LoginForm)

const Login = (props:any) => {
    const onSubmit = (formData: any) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>

}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login)
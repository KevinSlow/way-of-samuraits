import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/Validators/validators";



const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="text" validate={[required]} name={"login"} placeholder={"Login"} component={Input}/>
            </div>
            <div>
                <Field type="password" validate={[required]} name={"password"} placeholder={"Password"} component={Input}/>
            </div>
            <div>
                <Field type="checkbox" validate={[required]} name={"rememberMe"} component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm(
    {form: 'login'}
)(LoginForm)

const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>

}

export default Login
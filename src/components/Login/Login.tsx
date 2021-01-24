import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  CreateField,
  GetStringKeys,
  Input,
} from "../Common/FormsControls/FormsControls";
import { required } from "../../utils/Validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import s from "../Common/FormsControls/FormsControls.module.css";
import { StateType } from "../../redux/reduxStore";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl, ...restProps }) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField<LoginFormValuesTypeKeys>(
        "email",
        "email",
        [required],
        Input,
        { type: "text" }
      )}
      {CreateField<LoginFormValuesTypeKeys>(
        "password",
        "password",
        [required],
        Input,
        {
          type: "password",
        }
      )}
      {CreateField<LoginFormValuesTypeKeys>(
        "",
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember Me"
      )}

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        CreateField<LoginFormValuesTypeKeys>(
          "Symbols from image",
          "captcha",
          [required],
          Input,
          {}
        )}

      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};
type MapDispatchPropsType = {
  login: (
    email: number | null,
    password: string,
    rememberMe: string | null,
    captcha: null | undefined
  ) => void;
};

export type LoginFormValuesType = {
  captcha: null | undefined;
  rememberMe: string | null;
  password: string;
  email: number | null;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    console.log(formData);

    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: StateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);

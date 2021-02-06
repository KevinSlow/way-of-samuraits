import { stopSubmit } from "redux-form";
import {
  authAPI,
  ResultCodeEnum,
  ResultCodeEnumWithCaptcha,
} from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import store, { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { ProfileType } from "../types/types";
import { profileAPI } from "../api/profileAPI";
import { ResultCodesEnum } from "../api/api";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
};

export const actions = {
  setAuthUserDataSuccess: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/auth/SET_USER_DATA",
      payload: { email, userId, login, isAuth },
    } as const),
  getCaptchaURLSuccess: (captchaUrl: string) =>
    ({
      type: "SN/auth/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

const authReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/auth/SET_USER_DATA":
    case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};

export const setAuthUserData = (): AuthThunk => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { email, id, login } = data.data;
    dispatch(actions.setAuthUserDataSuccess(id, email, login, true));
  }
};

export const login = (
  email: number | null,
  password: string,
  rememberMe: string | null,
  captcha: null | undefined
): AuthThunk => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  console.log(loginData.resultCode);
  if (loginData.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserDataSuccess(email, password, rememberMe, true));
  } else {
    if (loginData.resultCode === ResultCodeEnumWithCaptcha.CaptchaIsRequired) {
      await dispatch(getCaptchaURL());
    }
    let message =
      loginData.messages.length > 0 ? loginData.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaURL = (): AuthThunk => async (dispatch) => {
  let response = await securityAPI.getCaptcha();
  const captchaUrl = response.url;
  dispatch(actions.getCaptchaURLSuccess(captchaUrl));
};

export const logout = (): AuthThunk => async (dispatch) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserDataSuccess(null, null, null, false));
  }
};

//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )
export type initialStateType = typeof initialState;
type AuthThunk = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;
type ActionsType = InferActionsTypes<typeof actions>;
export default authReducer;

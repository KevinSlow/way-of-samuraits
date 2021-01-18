import {
  authAPI,
  ResultCodeEnum,
  ResultCodeEnumWithCaptcha,
  securityAPI,
} from "../api/api";
import { stopSubmit } from "redux-form";
import { AppState, DispatchType, ThunkType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
};

export type initialStateType = typeof initialState;

type AuthActionType = SetAuthUserDataActionType | getCaptchaURLSuccessType;
type DispatchTypes = Dispatch<AuthActionType>;
type AuthThunk = ThunkAction<void, AppState, unknown, AuthActionType>;

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};

type SetAuthUserDataActionTypePayloadType = {
  userId: number;
  email: string;
  login: string;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionTypePayloadType;
};

export const setAuthUserDataSuccess = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType =>
  <SetAuthUserDataActionType>{
    type: SET_USER_DATA,
    payload: { email, userId, login, isAuth },
  };

export const setAuthUserData = (): AuthThunk => async (
  dispatch: DispatchTypes
) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCodeEnum.Success) {
    let { email, id, login } = data.data;
    dispatch(setAuthUserDataSuccess(id, email, login, true));
  }
};
type getCaptchaURLSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

export const getCaptchaURLSuccess = (
  captchaUrl: string
): getCaptchaURLSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const login = (
  email: number | null,
  password: string,
  rememberMe: string | null,
  captcha: null | undefined
): AuthThunk => async (dispatch: DispatchType) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserDataSuccess(email, password, rememberMe, true));
  } else {
    if (loginData.resultCode === ResultCodeEnumWithCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaURL());
    }
    let message =
      loginData.messages.length > 0 ? loginData.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaURL = (): AuthThunk => async (
  dispatch: DispatchType
) => {
  let response = await securityAPI.getCaptcha();
  const captchaUrl = response.url;
  dispatch(getCaptchaURLSuccess(captchaUrl));
};

export const logout = (): AuthThunk => async (
  dispatch: Dispatch<AuthActionType>
) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataSuccess(null, null, null, false));
  }
};
//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )

export default authReducer;

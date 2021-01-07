import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { DispatchType, IActionRecucerType } from "./store";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

type InitialStateType = {
  isAuth: boolean;
  captchaUrl: null | string;
  login: null | string;
  userId: null | number;
  email: null | string;
};

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
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
  userId: number,
  email: string,
  login: string,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const setAuthUserData = () => async (dispatch: DispatchType) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
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
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataSuccess(Number(email), password, rememberMe, true));
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaURL());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaURL = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptcha();
  const captchaUrl = response.url;
  dispatch(getCaptchaURLSuccess(captchaUrl));
};

export const logout = () => async (dispatch: DispatchType) => {
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

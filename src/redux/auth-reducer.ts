import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

type payloadType = {
  userId: number;
  email: string;
  login: boolean;
  isAuth: boolean;
};

type authReducerActionType = ReturnType<typeof setAuthUserDataSuccess>;

const authReducer = (state = initialState, action: authReducerActionType) => {
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

export const setAuthUserDataSuccess = (
  email: string,
  userId: string,
  login: boolean,
  isAuth: boolean
) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const setAuthUserData = () => async (dispatch: any) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { email, id, login } = data.data;
    dispatch(setAuthUserDataSuccess(id, email, login, true));
  }
};

export const getCaptchaURLSuccess = (captchaUrl: string) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null
) => async (dispatch: any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataSuccess(email, password, rememberMe, true));
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

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataSuccess("", "", false, false));
  }
};
//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )

export default authReducer;

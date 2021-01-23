import { instance, APIResponseType } from "./api";

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeEnumWithCaptcha {
  CaptchaIsRequired = 10,
}

export type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseType = {
  userId: number;
};
export const authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeResponseType>>(`auth/me`)
      .then((response) => {
        return response.data;
      });
  },
  login(
    email: number | null,
    password: string,
    rememberMe?: string | null,
    captcha: null | string = null
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseType,
          ResultCodeEnumWithCaptcha & ResultCodeEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

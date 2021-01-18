import axios, { AxiosResponse } from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  headers: {
    "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  getUsersProfile(userId: number | null) {
    return profileAPI.getUsersProfile(userId);
  },
  unfollowUsers(userId: number | null) {
    return instance.delete(`/follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  followUsers(userId: number | null) {
    return instance.post(`/follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};

export const profileAPI = {
  getUsersProfile(userId: number | null) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number | null) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, { status: status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile).then((response) => response.data);
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeEnumWithCaptcha {
  CaptchaIsRequired = 10,
}
type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodeEnum | ResultCodeEnumWithCaptcha;
  messages: string[];
};

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodeEnum;
  messages: string[];
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => {
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
      .post<LoginResponseType>(`auth/login`, {
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

export const securityAPI = {
  getCaptcha() {
    return instance
      .get(`security/get-captcha-url`)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      });
  },
};

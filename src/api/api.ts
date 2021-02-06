import axios from "axios";
import { UserType } from "../types/types";
import { ResultCodeEnum } from "./authAPI";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  headers: {
    "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCapcthaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type APIResponseType<
  D = {},
  RC = ResultCodesEnum | ResultCodeForCapcthaEnum
> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

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

export type GetUsersItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

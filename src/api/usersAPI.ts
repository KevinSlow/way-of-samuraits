import { GetUsersItemsType, instance } from "./api";
import { profileAPI } from "./profileAPI";
import { AxiosPromise } from "axios";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersItemsType>(`users?page=${currentPage}&count=${pageSize}`)
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
    }) as AxiosPromise<ResponseType>;
  },
  followUsers(userId: number | null) {
    return instance.post<ResponseType>(`/follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};

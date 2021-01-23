import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType } from "./api";

type SafePhotoResponseDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getUsersProfile(userId: number | null) {
    return instance
      .get<ProfileType>(`profile/` + userId)
      .then((res) => res.data);
  },
  getStatus(userId: number | null) {
    return instance
      .get<string>(`profile/status/` + userId)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance
      .put<APIResponseType>(`profile/status/`, { status: status })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<APIResponseType<SafePhotoResponseDataType>>(
        `profile/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<APIResponseType>(`profile`, profile)
      .then((response) => response.data);
  },
};

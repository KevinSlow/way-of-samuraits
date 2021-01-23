import { AxiosResponse } from "axios";
import { instance } from "./api";

type GetCaptchaUrlResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptcha() {
    return instance
      .get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      });
  },
};

import { follow } from "./usersReducer";
import { usersAPI } from "../api/usersAPI";
import { APIResponseType, ResultCodesEnum } from "../api/api";

jest.mock("../api/usersAPI");
const userAPIMock = usersAPI;
const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};
// @ts-ignore
userAPIMock.follow.mockReturnValue(result);

test("Thunk", async () => {
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  // @ts-ignore
  await thunk(dispatchMock);

  expect(dispatchMock).toBeCalledTimes(3);
});

import { actions, follow, unfollow } from "./usersReducer";
import { usersAPI } from "../api/usersAPI";
import { APIResponseType, ResultCodesEnum } from "../api/api";

jest.mock("../api/usersAPI");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

const dispatchMock = jest.fn();
const getState = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  getState.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("Success Follow Thunk", async () => {
  const thunk = follow(1);

  await thunk(dispatchMock, getState, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenCalledWith(
    1,
    actions.setFollowingProgress(true, 3)
  );
  expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(3));
  expect(dispatchMock).toHaveBeenCalledWith(
    3,
    actions.setFollowingProgress(false, 1)
  );
});

test("Success UnFollow Thunk", async () => {
  const thunk = unfollow(1);

  await thunk(dispatchMock, getState, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenCalledWith(
    1,
    actions.setFollowingProgress(true, 3)
  );
  expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess(3));
  expect(dispatchMock).toHaveBeenCalledWith(
    3,
    actions.setFollowingProgress(false, 1)
  );
});

import usersReducer, { actions, follow, InitialState } from "./usersReducer";
import { UserType } from "../types/types";
let state: InitialState = {
  users: [
    {
      id: 0,
      name: "Frank",
      followed: false,
      photos: { small: null, large: null },
      status: "status 0",
    },
    {
      id: 0,
      name: "John",
      followed: true,
      photos: { small: null, large: null },
      status: "status 0",
    },
    {
      id: 0,
      name: "Dan",
      followed: true,
      photos: { small: null, large: null },
      status: "status 0",
    },
    {
      id: 0,
      name: "Sean",
      followed: false,
      photos: { small: null, large: null },
      status: "status 0",
    },
  ] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Frank",
        followed: false,
        photos: { small: null, large: null },
        status: "status 0",
      },
      {
        id: 1,
        name: "John",
        followed: false,
        photos: { small: null, large: null },
        status: "status 0",
      },
      {
        id: 2,
        name: "Dan",
        followed: true,
        photos: { small: null, large: null },
        status: "status 0",
      },
      {
        id: 3,
        name: "Sean",
        followed: true,
        photos: { small: null, large: null },
        status: "status 0",
      },
    ] as Array<UserType>,
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
  };
});

test("Follow Success", () => {
  //userReducer()

  const newState = usersReducer(state, actions.followSuccess(0));

  //expect()
  expect(newState.users[0].followed).toBeTruthy();
  expect(newState.users[1].followed).toBeFalsy();
});

test("Unfollow Success", () => {
  //userReducer()

  const newState = usersReducer(state, actions.unfollowSuccess(3));

  //expect()
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});

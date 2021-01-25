import { StateType } from "./reduxStore";

export const selectIsAuth = (state: StateType) => {
  return state.auth.isAuth;
};

export const selectCurrentUserLogin = (state: StateType) => {
  return state.auth.login;
};

export const selectUserIcon = (state: StateType) => {
  return state.usersPage.users;
};

import { setAuthUserData } from "./auth-reducer";
import { ThunkAction } from "redux-thunk";
import {
  AppState,
  DispatchType,
  IActionRecucerType,
  StateType,
} from "../types/types";

import { ActionsType, BaseThunkType } from "./reduxStore";

type InitialStateType = typeof initialState;

let initialState = {
  initialized: false,
  globalError: null,
};

type ThunkAppType = BaseThunkType<ActionsType>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/SET_INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
  }
  return state;
};

export const actions = {
  initializedSuccess: () => ({
    type: "SN/APP/SET_INITIALIZED_SUCCESS",
  }),
};

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(setAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSuccess());
    });
  };
};

export default appReducer;

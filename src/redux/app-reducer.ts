import { setAuthUserData } from "./auth-reducer";
import { ThunkAction } from "redux-thunk";
import {
  AppState,
  DispatchType,
  IActionRecucerType,
  StateType,
} from "../types/types";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

type InitialStateType = {
  initialized: boolean;
  globalError: null;
};

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
};

type AppActionType = InitializedSuccessActionType;
type ThunkAppType = ThunkAction<void, AppState, unknown, AppActionType>;

const appReducer = (
  state = initialState,
  action: AppActionType
): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
  }
  return state;
};

type InitializedSuccessActionType = {
  type: typeof SET_INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: SET_INITIALIZED_SUCCESS,
});

export const initializeApp = (): ThunkAppType => {
  return (dispatch: DispatchType) => {
    let promise = dispatch(setAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;

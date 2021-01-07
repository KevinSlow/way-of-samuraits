import { setAuthUserData } from "./auth-reducer";
import { DispatchType, IActionRecucerType, StateType } from "./store";
import { ThunkAction } from "redux-thunk";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

type InitialStateType = {
  initialized: boolean;
  globalError: null;
};

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
};

const appReducer = (
  state = initialState,
  action: IActionRecucerType
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

export const initializeApp = (): ThunkAction<
  void,
  StateType,
  unknown,
  IActionRecucerType
> => {
  return (dispatch: DispatchType) => {
    let promise = dispatch(setAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;

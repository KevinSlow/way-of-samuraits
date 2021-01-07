import { setAuthUserData } from "./auth-reducer";
import { DispatchType, IActionRecucerType, StateType } from "./store";
import { ThunkAction } from "redux-thunk";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action: IActionRecucerType) => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
  }
  return state;
};

export const initializedSuccess = () => ({
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

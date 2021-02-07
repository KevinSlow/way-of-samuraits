import { chatAPI, ChatMessageType } from "../api/chatAPI";
import store, { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from "react";
import { FormAction } from "redux-form";

let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateTypes => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
  }
  return state;
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "SN/chat/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: typeof store.dispatch) => {
  if (_newMessageHandler !== null) {
    return _newMessageHandler;
  }
  _newMessageHandler = (messages) => {
    dispatch(actions.messagesReceived(messages));
  };
  return _newMessageHandler;
};

export const startMessagesListening = (): AuthThunks => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): AuthThunks => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessage = (message: string): AuthThunks => async (
  dispatch
) => {
  chatAPI.sendMessage(message);
};
export default chatReducer;

type ActionsTypes = InferActionsTypes<typeof actions>;
export type initialStateTypes = typeof initialState;
type AuthThunks = BaseThunkType<ActionsTypes | FormAction>;

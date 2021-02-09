import { chatAPI, ChatMessageType, StatusType } from "../api/chatAPI";
import store, { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { FormAction } from "redux-form";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
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
    case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
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
  statusChanged: (status: StatusType) =>
    ({
      type: "SN/chat/STATUS_CHANGED",
      payload: { status },
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: typeof store.dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): AuthThunks => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): AuthThunks => async (dispatch) => {
  chatAPI.unsubscribe("message-received", newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
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

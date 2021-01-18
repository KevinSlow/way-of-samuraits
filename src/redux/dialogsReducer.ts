import { IActionRecucerType } from "../types/types";

const ADD_DIALOG = "ADD-DIALOG";
const DELETE_DIALOG = "DELETE_DIALOG";

type MessageType = {
  id: number;
  message: string;
};
type DialogsType = {
  id: number;
  name: string;
};
const initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your day?" },
    { id: 3, message: "Fine, tahnks" },
    { id: 4, message: "Svetlana" },
    { id: 5, message: "Trysa" },
    { id: 6, message: "Fine" },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: "Dimich123" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Valera" },
    { id: 4, name: "Sveta" },
    { id: 5, name: "Polina" },
    { id: 6, name: "Sasha" },
  ] as Array<DialogsType>,
};

type DialogsActions =
  | addDialogActionCreatorType
  | deleteDialogActionCreatorType;

const dialogsReducer = (state = initialState, action: DialogsActions) => {
  switch (action.type) {
    case ADD_DIALOG: {
      let newDialogText = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: newDialogText }],
      };
    }
    case DELETE_DIALOG: {
      return {
        ...state,
        dialogs: state.dialogs.filter((p) => p.id !== action.dialogId),
      };
    }
    default:
      return state;
  }
};

type addDialogActionCreatorType = {
  type: typeof ADD_DIALOG;
  newMessageBody: string;
};

export const addDialogActionCreator = (
  newMessageBody: string
): addDialogActionCreatorType => ({
  type: ADD_DIALOG,
  newMessageBody,
});
type deleteDialogActionCreatorType = {
  type: typeof DELETE_DIALOG;
  dialogId: number;
};
export const deleteDialog = (
  dialogId: number
): deleteDialogActionCreatorType => ({
  type: DELETE_DIALOG,
  dialogId,
});

export default dialogsReducer;

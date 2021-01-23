import { InferActionsTypes } from "./reduxStore";

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

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/ADD-DIALOG": {
      let newDialogText = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: newDialogText }],
      };
    }
    case "SN/DIALOGS/DELETE_DIALOG": {
      return {
        ...state,
        dialogs: state.dialogs.filter((p) => p.id !== action.dialogId),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addDialogAction: (newMessageBody: string) =>
    ({
      type: "SN/DIALOGS/ADD-DIALOG",
      newMessageBody,
    } as const),
  deleteDialog: (dialogId: number) =>
    ({
      type: "SN/DIALOGS/DELETE_DIALOG",
      dialogId,
    } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;

export default dialogsReducer;

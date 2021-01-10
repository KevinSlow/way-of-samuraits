import { IActionRecucerType } from "../types/types";
type initialStateType = typeof initialState;
const initialState = {
  friends: [
    {
      id: 1,
      name: "Kiril",
      imgUrl:
        "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
    },
    {
      id: 2,
      name: "Ivan",
      imgUrl:
        "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
    },
    {
      id: 3,
      name: "Petrovich",
      imgUrl:
        "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg",
    },
  ],
};

const sidebarReducer = (
  state = initialState,
  action: IActionRecucerType
): initialStateType => {
  return state;
};

export default sidebarReducer;

import usersReducer, {followSuccess} from "./usersReducer";

let State = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


test('follow', () => {
    // 1. Test Data
    // let action = followSuccess(2);
    // /// 2. Action
    // let newState = usersReducer(State, action)
    // /// 3. Expectation
    // expect(State.followed).toBe(true);
});

export const getUsers = (state: any) => {
    return state.usersPage.users;
}

export const getPageSize = (state: any) => {
    return state.usersPage.pageSize;
}

export const getTotalUserCount = (state: any) => {
    return state.usersPage.totalUserCount;
}

export const getCurrentPage = (state: any) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: any) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: any) => {
    return state.usersPage.followingInProgress
}


import React, { useEffect } from "react";
import UsersPagination from "../Common/Pagination/Pagination";
import User from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  getUsersFilter,
  requestUsers,
} from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUserCount,
  getUsers,
} from "../../redux/users-selectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {};
type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
};
let Users: React.FC<PropsType> = () => {
  const users = useSelector(getUsers);
  const totalUserCount = useSelector(getTotalUserCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search
    ) as QueryParamsType;
    let actualFilter = filter;
    let actualPage = currentPage;
    if (parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    // if (!!parsed.friend)
    //   actualFilter = {
    //     ...actualFilter,
    //     friend:
    //       parsed.friend === "null"
    //         ? null
    //         : parsed.friend === "true"
    //         ? true
    //         : false,
    //   };
    switch (parsed.friend) {
      case "null": {
        actualFilter = { ...actualFilter, friend: null };
        break;
      }
      case "true": {
        actualFilter = { ...actualFilter, friend: true };
        break;
      }
      case "false": {
        actualFilter = { ...actualFilter, friend: false };
        break;
      }
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/developers",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const follow = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <UsersPagination
        totalUserCount={totalUserCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            follow={follow}
            unfollow={unfollow}
            followingInProgress={followingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;

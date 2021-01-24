import React from "react";
import UsersPagination from "../Common/Pagination/Pagination";
import User from "./User";
import { UserType } from "../../types/types";
import { Formik } from "formik/dist/Formik";

type UsersPropsType = {
  followingInProgress: Array<number>;
  users: UserType[];
  currentPage: number;
  pageSize: number;
  totalUserCount: number;
  onPageChanged: (pageNumber: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

let Users: React.FC<UsersPropsType> = ({
  followingInProgress,
  users,
  currentPage,
  pageSize,
  totalUserCount,
  onPageChanged,
  ...props
}: UsersPropsType) => {
  return (
    <div>
      <UsersSearchForm />
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
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={followingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

const UsersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type UsersSearchFormType = {
  term: string;
};

const UsersSearchForm = () => {
  const submit = (
    values: UsersSearchFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "Find" }}
        validate={UsersSearchFormValidate}
        onSubmit={submit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="term"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.term}
            />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Users;

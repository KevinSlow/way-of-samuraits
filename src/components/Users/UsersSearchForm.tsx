import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType, getUsersFilter } from "../../redux/usersReducer";
import { useSelector } from "react-redux";

const UsersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: FriendFormType;
};

type UsersSearchFormType = {
  onFilterChanged: (filter: FilterType) => void;
};
type FriendFormType = "true" | "false" | "null";
export const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo(
  (props) => {
    const filter = useSelector(getUsersFilter);

    const submit = (
      values: FormType,
      { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
    ) => {
      const filter: FilterType = {
        term: values.term,
        friend:
          values.friend === "null"
            ? null
            : values.friend === "true"
            ? true
            : false,
      };
      props.onFilterChanged(filter);
      setSubmitting(false);
    };

    return (
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            term: filter.term,
            friend: String(filter.friend) as FriendFormType,
          }}
          validate={UsersSearchFormValidate}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="term" />
              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only Followed</option>
                <option value="false">Only UnFollowed</option>
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Find
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

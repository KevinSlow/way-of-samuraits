import { Formik } from "formik";
import React from "react";

const UsersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};
type UsersSearchFormType = {
  term: string;
};
export const UsersSearchForm = () => {
  const submit = (
    values: UsersSearchFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {};

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

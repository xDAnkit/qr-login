import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSignUp = (values, { setSubmitting }) => {
    console.log(values, "up");
    setSubmitting(false);
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={onSignUp}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label htmlFor="name" className="labelstyles">
                Name
              </label>
              <Field type="text" name="name" className="fieldstyles" />
              <ErrorMessage
                name="name"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="labelstyles">
                Email
              </label>
              <Field type="email" name="email" className="fieldstyles" />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="labelstyles">
                Password
              </label>
              <Field type="password" name="password" className="fieldstyles" />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonstyles"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export const SignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSignIn = (values, { setSubmitting }) => {
    console.log(values, "in");
    setSubmitting(false);
  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={onSignIn}>
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label htmlFor="email" className="labelstyles">
                Email
              </label>
              <Field type="email" name="email" className="fieldstyles" />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="labelstyles">
                Password
              </label>
              <Field type="password" name="password" className="fieldstyles" />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="buttonstyles"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

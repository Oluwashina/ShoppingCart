import React,{useState} from "react";
import "../../styles/login.css"
import { Form, Formik } from "formik";
import { loginValidator } from "../../validationSchema/validator";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // login func
  const handleSubmit = async (values) => {
    // await console.log(values)
    console.log(values)
  };

  return (
    <>
      <div className="contain mt-4 mb-5">
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="login_bg">
              <div className="login_bg_text">
                <h1>Great food anytime, anywhere</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login-section">
              <div className="login-heading">
                <h3>Sign Up</h3>
                <p>Please fill the forms to create your account</p>
              </div>

              {/* form layout for login */}
              <Formik
                onSubmit={(values, { setSubmitting }) =>
                  handleSubmit(values, setSubmitting)
                }
                validationSchema={loginValidator}
                initialValues={{ email: "", password: "" }}
              >
                {({
                  handleChange,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* form section */}
                    <div className="mt-4 form-container">
                      {/* email address */}
                      <div className="form-group input-container mb-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                          className="form-control input-style"
                          type="email"
                          placeholder="Your Email"
                          id="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                        />
                        <small style={{ color: "#dc3545" }}>
                          {touched.email && errors.email}
                        </small>
                      </div>

                      {/* password */}
                      <div className="form-group input-container mb-2">
                        <label htmlFor="password">Password</label>

                        <div style={{ position: "relative" }}>
                          <input
                            className="form-control input-style"
                            placeholder="Password"
                            id="password"
                            type={passwordShown ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <i
                            onClick={togglePasswordVisiblity}
                            className={
                              passwordShown
                                ? "mdi mdi-eye toggle-style"
                                : "mdi mdi-eye-off toggle-style"
                            }
                          ></i>
                        </div>
                        <small style={{ color: "#dc3545" }}>
                          {touched.password && errors.password}
                        </small>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-login_submit"
                        >
                          Sign Up
                        </button>
                      </div>

                      <div className="mt-3">
                        <p className="login_link text-center">
                          Already have an account? <Link to="/">Log in</Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

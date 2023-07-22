import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNotification } from "../components/Notification";
import { useLoginMutation } from "../app/services/authApi";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainHomeButton,
  MainWrapper,
} from "../styles/pages/loginStyles";
import loginSchema from "../validationSchemas/login";
import { AiFillEye, AiFillEyeInvisible, AiFillHome } from "react-icons/ai";
import { ButtonLoader } from "../components/Loaders";

const Login = () => {
  const [login, { error: requestError, isError, isLoading }] =
    useLoginMutation();
  const navigate = useNavigate();
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setShowPassword(false);
        const data = await login({ body: values }).unwrap();
        resetForm();
        createNotification(`Welcome ${data?.data?.name}`, "success", 2000);
        const { _id: id } = data?.data;
        navigate(`/users/${id}`);
      } catch (error) {}
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <MainWrapper>
        <MainHomeButton>
          <Link to="/">
            <AiFillHome />
          </Link>
        </MainHomeButton>
        <MainCard>
          <MainCardForm onSubmit={handleSubmit} login>
            <div className="inner">
              <div className="form-head">Login</div>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email ? errors.email : null}
              />
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? true : false}
                helperText={
                  touched.password && errors.password ? errors.password : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onCopy={(e) => {
                  e.preventDefault();
                }}
                onPaste={(e) => {
                  e.preventDefault();
                }}
              />
              <button
                className="form-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Login"}
              </button>
              <div
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password ?
              </div>
              {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )}
            </div>
          </MainCardForm>
          <MainCardImage url="/images/login.jpg">
            <MainCardOverLay>
              <div className="heading">Welcome Back Mate.</div>
              <div className="text">
                Login and you can like, comment and save other's projects. You
                can also post and manage your own precious projects and let the
                world appreciate.
              </div>
              <div className="text">Don't have an account ?</div>
              <Link to="/register">
                <button className="card-button">Register</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default Login;

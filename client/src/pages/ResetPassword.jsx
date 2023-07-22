import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../app/services/authApi";
import { ButtonLoader } from "../components/Loaders";
import { createNotification } from "../components/Notification";
import {
  MainHomeButton,
  MainWrapper,
  ResetPasswdCard,
} from "../styles/pages/loginStyles";
import resetPasswordSchema from "../validationSchemas/resetPassword";

const ResetPassword = () => {
  const [reset, { isLoading }] = useResetPasswordMutation();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
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
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setShowPassword(false);
        const resetData = await reset({ body: values, token }).unwrap();
        resetForm();
        createNotification(resetData?.msg, "success", 2000);
        navigate("/login");
      } catch (error) {
        createNotification(error?.data?.msg, "error", 2000);
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <MainWrapper>
      <MainHomeButton>
        <Link to="/">
          <AiFillHome />
        </Link>
      </MainHomeButton>
      <ResetPasswdCard onSubmit={handleSubmit}>
        <div className="form-head">Reset Password</div>

        <TextField
          name="newPassword"
          label="New Password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          color="secondary"
          className="form-input"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newPassword && errors.newPassword ? true : false}
          helperText={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : null
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
        <TextField
          name="cnfrmNewPassword"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          color="secondary"
          className="form-input"
          value={values.cnfrmNewPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.cnfrmNewPassword && errors.cnfrmNewPassword ? true : false
          }
          helperText={
            touched.cnfrmNewPassword && errors.cnfrmNewPassword
              ? errors.cnfrmNewPassword
              : null
          }
          onPaste={(e) => {
            e.preventDefault();
          }}
          onCopy={(e) => {
            e.preventDefault();
          }}
        />

        <button className="form-button" type="submit">
          {isLoading ? <ButtonLoader /> : "Reset Password"}
        </button>
      </ResetPasswdCard>
    </MainWrapper>
  );
};

export default ResetPassword;

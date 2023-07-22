import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../app/services/authApi";
import { ButtonLoader } from "../components/Loaders";
import { createNotification } from "../components/Notification";
import {
  MainWrapper,
  MainHomeButton,
  ForgotPasswdCard,
} from "../styles/pages/loginStyles";
import forgotPasswordSchema from "../validationSchemas/forgotPassword";

const ForgotPassword = () => {
  const [forgot, { isLoading }] = useForgotPasswordMutation();

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
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const forgotData = await forgot({ body: values }).unwrap();
        createNotification(forgotData?.msg, "success", 2000);
        resetForm();
      } catch (error) {
        createNotification(error?.data?.msg, "error", 2000);
      }
    },
  });

  return (
    <MainWrapper>
      <MainHomeButton>
        <Link to="/">
          <AiFillHome />
        </Link>
      </MainHomeButton>
      <ForgotPasswdCard onSubmit={handleSubmit}>
        <div className="form-head">Forgot Password</div>
        <div className="form-ques">
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            color="secondary"
            className="form-input"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? true : false}
            helperText={touched.email && errors.email ? errors.email : null}
          />
        </div>
        <button className="form-button" type="submit" disabled={isLoading}>
          {isLoading ? <ButtonLoader /> : "Send Reset Email"}
        </button>
      </ForgotPasswdCard>
    </MainWrapper>
  );
};

export default ForgotPassword;

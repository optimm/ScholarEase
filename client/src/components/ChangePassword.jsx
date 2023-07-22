import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useChangePasswordMutation } from "../app/services/authApi";
import { InnerWrapper } from "../styles/components/changePasswordStyles";
import { EditForm, Footer } from "../styles/components/editProfileStyles";
import "../styles/modal.css";
import { trimAll } from "../util/utilFunctions";
import changePasswordSchema from "../validationSchemas/changePassword";
import { createNotification } from "./Notification";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ButtonLoader } from "./Loaders";

const ChangePassword = ({ show, setShow }) => {
  const { touched, errors, values, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values) => {
        values = trimAll(values);
        try {
          const data = await change({ body: values }).unwrap();
          createNotification(data?.msg, "success", 2000);
          setShow(false);
        } catch (error) {}
      },
    });

  const handleClose = () => setShow(false);
  const [change, { isLoading, error, isError }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <EditForm onSubmit={handleSubmit}>
        <Modal.Body>
          <InnerWrapper>
            <TextField
              name="currentPassword"
              label="Current Password"
              variant="outlined"
              color="secondary"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.currentPassword && errors.currentPassword ? true : false
              }
              helperText={
                touched.currentPassword && errors.currentPassword
                  ? errors.currentPassword
                  : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
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
              name="newPassword"
              label="New Password"
              variant="outlined"
              color="secondary"
              fullWidth
              type={showPassword1 ? "text" : "password"}
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
                      onClick={() => setShowPassword1(!showPassword1)}
                    >
                      {showPassword1 ? <AiFillEye /> : <AiFillEyeInvisible />}
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
          </InnerWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Footer>
            <div className="error-text">{isError && error?.data?.msg}</div>
            <button
              className="submit-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader/> : "Update"}
            </button>
          </Footer>
        </Modal.Footer>
      </EditForm>
    </Modal>
  );
};

export default ChangePassword;

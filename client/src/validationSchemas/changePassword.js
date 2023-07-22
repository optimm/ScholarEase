import * as yup from "yup";

let changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .strict(true)
    .trim("New Password cannot contain leading and trailing spaces")
    .min(6, "New Password must be atleast 6 characters"),
});

export default changePasswordSchema;

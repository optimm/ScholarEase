import * as yup from "yup";

let resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    .strict(true)
    .trim("New Password cannot contain leading and trailing spaces")
    .min(6, "New Password must be atleast 6 characters"),
  cnfrmNewPassword: yup
    .string()
    .required("Password confirmation is required")
    .test("cnfrmNewPassword", "Both fields should match", function (val) {
      if (
        !val ||
        val.trim() === "" ||
        (this?.parent.newPassword && val !== this?.parent.newPassword)
      ) {
        return false;
      }
      return true;
    }),
});

export default resetPasswordSchema;

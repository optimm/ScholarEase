import * as yup from "yup";

let registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test("name", "Name is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .min(2, "Name must be atleast 2 characters")
    .max(40, "Name cannot be more than 40 characters")
    .test("name", "Name must be atleast 2 characters", (val) => {
      if (val && val.trim().length < 2) return false;
      return true;
    }),
  username: yup
    .string()
    .required("Username is required")
    .test("username", "Username is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .min(2, "Username must be atleast 2 characters")
    .max(10, "Username cannot be more than 10 characters")
    .test("username", "Username must be atleast 2 characters", (val) => {
      if (val && val.trim().length < 2) return false;
      return true;
    }),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .strict(true)
    .trim("Password cannot contain leading and trailing spaces")
    .min(6, "Password must be atleast 6 characters"),
});

export default registerSchema;

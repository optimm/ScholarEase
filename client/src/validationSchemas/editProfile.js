import * as yup from "yup";

let editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test("name", "Name is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .min(2, "Name must be atleast 2 characters")
    .max(50, "Name cannot be more than 50 characters")
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
  bio: yup.string().max(200, "Bio cannot be more than 200 characters"),
  about: yup.string().max(1000, "About cannot be more than 1000 characters"),
  profiles: yup.array(
    yup.object({
      platform: yup.string().required("Platform is required"),
      link: yup.string().required("Link is required"),
    })
  ),
});

export default editProfileSchema;

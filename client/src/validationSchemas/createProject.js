import * as yup from "yup";

let createProjectSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .test("title", "Title is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .min(2, "Title should be atleast 2 characters")
    .max(50, "Title cannot be more than 50 characters")
    .test("title", "Title must be atleast 2 characters", (val) => {
      if (val && val.trim().length < 2) return false;
      return true;
    }),

  desc: yup.string().max(500, "Description cannot be more than 500 characters"),
  link: yup.string(),
  tags: yup.array(yup.string().required("Tag is required")),
});

export default createProjectSchema;

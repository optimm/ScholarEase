import * as yup from "yup";

let commentSchema = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .test("comment", "Comment is required", (val) => {
      if (!val || (val && !val.trim().length)) return false;
      return true;
    })
    .max(200, "Comment cannot be more than 200 characters"),
});

export default commentSchema;

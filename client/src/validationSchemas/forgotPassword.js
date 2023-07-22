import * as yup from "yup";

let forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default forgotPasswordSchema;

const sgMail = require("@sendgrid/mail");
const { CustomAPIError } = require("../errors");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SendMail = async ({ email, token }) => {
  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const msg = {
    to: email,
    from: "devhubbbb@gmail.com",
    subject: "Reset Your Password",
    html: `<div>
    <p>This Email is regarding reseting your password. The link can only be used once and will be valid for 10 minutes only</p>
   <p>${link}</p>
    </div>`,
  };
  let success = "Reset password email sent";

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new CustomAPIError("Password reset email could not be sent");
  }
  return success;
};

module.exports = { SendMail };

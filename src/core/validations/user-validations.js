// service to validate user signup form
export const validateUserLogin = (values) => {
  const errors = {};
  console.log("validation", values);

  // Validate Name
  if (typeof values.email !== "string" || values.email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  // Validate Password
  if (typeof values.password !== "string" || values.password.trim() === "") {
    errors.password = "Password must not be empty";
  };
  return errors;
}




export const validateUsername = (value) => {
  let error;
  if (!value) {
    error = "Username is required";
  } else if (value.length < 3) {
    error = "Username must be at least 3 characters long";
  }
  return error;
};

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

export const validatePassword = (value) => {
  let error;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!value) {
    error = "Password is required";
  } else if (value.length < 8) {
    error = "Password must be at least 8 characters long";
  } else if (!passwordRegex.test(value)) {
    error =
      "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return error;
};

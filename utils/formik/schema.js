import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter your valid email")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .required("Email is required")
    .trim(),
  password: yup.string().required("Password is required").trim(),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter your valid email")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .required("Email is required")
    .trim(),
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .required("Name is required")
    .trim(),
  email: yup
    .string()
    .email("Enter your valid email")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one special character and one number"
    )
    .required("Password is required")
    .trim(),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Both password doesn't match")
    .required("Re-enter your password")
    .trim(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile must contain only numbers")
    .min(10, "Mobile must be at least 10 digits")
    .max(15, "Mobile cannot be more than 15 digits")
    .required("Mobile is required"),
});

export const groupSchema = yup.object().shape({
  groupName: yup
    .string()
    // .matches(/^[A-Za-z\s]+$/, "Group name must contain only letters")
    .required("Group name is required")
    .trim(),
});

export const newMemberSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .required("Name is required")
    .trim(),
  email: yup
    .string()
    .email("Enter your valid email")
    .required("Email is required")
    .trim(),
  countryCode: yup.string(),
  relation: yup.string().required("Please Select a relation"),
  // mobile: yup
    // .string()
    // .matches(/^[0-9]+$/, "Mobile must contain only numbers")
    // .min(10, "Mobile must be at least 10 digits")
    // .max(15, "Mobile cannot be more than 15 digits")
    // .required("Mobile is required"),
});

export const updateProfileSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .required("Name is required")
    .trim(),
  email: yup
    .string()
    .email("Enter your valid email")
    .required("Email is required")
    .trim(),
  countryCode: yup.string(),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile must contain only numbers")
    .min(10, "Mobile must be at least 10 digits")
    .max(15, "Mobile cannot be more than 15 digits")
    .required("Mobile is required"),
});

export const newEventSchema = yup.object().shape({
  eventName: yup.string().required("Event name is required").trim(),
  category: yup.string().required("Event category is required").trim(),
  date: yup.string().required("Event date is required").trim(),
  details: yup.string().required("Event details is required").trim(),
  group: yup.string().required("Please Select a group.").trim(),
});

export const updatePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required").trim(),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one special character and one number"
    )
    .required("Password is required")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Both password doesn't match")
    .required("Re-enter your password")
    .trim(),
});

export const getInTouchSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

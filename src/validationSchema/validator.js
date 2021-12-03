import * as Yup from "yup";

export const loginValidator = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password cannot be less than 6 characters")
    .required("Password is required"),
});


export const cardValidator = Yup.object({
  name: Yup.string().required("Name is required"),
  cardNumber: Yup.string()
    .min(16, "Card Number cannot be less than 16 digits")
    .max(16, "Exceeded characters for card number")
    .required("Card Number is required")
    .matches(/^-?[0-9]+(.[0-9]{1-7})?$/, "Enter a valid card number"),
  month: Yup.string()
    .min(2, "Required")
    .max(2, "Required")
    .required("Required"),
  year: Yup.string().min(2, "Required").max(2, "Required").required("Required"),
  cvv: Yup.string().min(3, "Required").max(3, "Exceeded").required("Required"),
});
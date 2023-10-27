import validator from "validator";

export const validateNigeriaPhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber, "en-NG");
};

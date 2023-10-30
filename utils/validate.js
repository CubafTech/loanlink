import validator from "validator";
import AppError from "./appError.js";

export const validateNigeriaPhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber, "en-NG");
};

export const validateRequestWithSchema = (req, schema, next) => {
  const exclude = [
    "__v",
    "_id",
    "createdAt",
    "updatedAt",
    "createdBy",
    "status",
  ];
  const values = Object.keys(schema.paths).filter(
    (key) => !exclude.includes(key)
  );
  const bodyRequest = Object.keys(req.body).filter(
    (value) => !values.includes(value)
  );

  if (bodyRequest.length !== 0) {
    return next(new AppError(`${bodyRequest[0]} is not a valid data`));
  }

  const required = Object.keys(schema.paths)
    .filter((key) => schema.paths[key].isRequired)
    .filter((value) => !Object.keys(req.body).includes(value));

  if (required.length !== 0) {
    return next(new AppError(`${required[0]} is required`));
  }

  return { values, required };
};

import { ApplicationError } from "../protocols";

export function badRequestError(): ApplicationError {
  return {
    name: "BadRequestError",
    message: "Cannot process your request due to invalid data input",
  };
}

import { ApplicationError } from "../protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "The requested resource was not found ",
  };
}

import { ApplicationError } from "../protocols";

export function conflictError(): ApplicationError {
  return {
    name: "ConflictError",
    message: "This product is already registered",
  };
}

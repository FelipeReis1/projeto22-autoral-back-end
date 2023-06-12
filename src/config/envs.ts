import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Secret } from "jsonwebtoken";

dotenv.config();

export function loadEnv() {
  const path =
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "development"
      ? ".env.development"
      : ".env";

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
}
export const jwtSecret = process.env.JWT_SECRET as Secret;

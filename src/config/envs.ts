import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

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
export const jwtSecret =
  process.env.JWT_SECRET ||
  "0d29dfc99c684a43aeb11b7302c54f98e0dfdb63347f961dcf89b7f086e2ab45";

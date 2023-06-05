import chalk from "chalk";
import app, { init } from "./app";

const PORT = process.env.PORT || 5000;
init().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.blue(`Server is up and running in port: ${PORT}`));
  });
});

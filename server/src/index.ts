import "dotenv/config";
import http from "http";

import app from "./app";
import { sequelize } from "./database";

const PORT = Number(process.env.SERVER_PORT || "8888");
const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: false });

    server.listen(PORT, () => {
      console.log(`Server start working on PORT: ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Can't start server: ${error.message}`);
    }
  }
};

startServer();

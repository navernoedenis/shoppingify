import express from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

import productsRouter from "./resources/products/router";
import shoppingListsRouter from "./resources/shopping-lists/router";

import { signIn, signUp } from "./resources/auth/controllers";
import { protect } from "./helpers/protect";
import { handleErrorMiddleware } from "./helpers/errors";

const app = express();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true
};

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/auth/sign-in", signIn);
app.post("/auth/sign-up", signUp);

app.post("/test", (req, res) => {
  res.status(200).json({ message: "Test works!" });
});

app.use("/api", protect);
app.use("/api/products", productsRouter);
app.use("/api/shopping-list", shoppingListsRouter);

app.use(handleErrorMiddleware);

export default app;

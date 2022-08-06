import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct
} from "./controllers";

const productsRouter = express.Router();

productsRouter.route("/").post(createProduct).get(getProducts);

productsRouter
  .route("/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(removeProduct);

export default productsRouter;

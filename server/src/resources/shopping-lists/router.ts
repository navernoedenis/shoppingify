import express from "express";
import {
  closeShoppingList,
  createShoppingList,
  deleteShoppingItem,
  getClosedShoppingLists,
  getShoppingList,
  getShoppingListStatistics
} from "./controllers";

const shoppingListsRouter = express.Router();

shoppingListsRouter
  .route("/")
  .get(getShoppingList)
  .post(createShoppingList)
  .patch(closeShoppingList);

shoppingListsRouter.route("/closed").get(getClosedShoppingLists);
shoppingListsRouter.route("/items").delete(deleteShoppingItem);
shoppingListsRouter.route("/statistics").get(getShoppingListStatistics);

export default shoppingListsRouter;

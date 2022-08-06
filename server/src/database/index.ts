import { sequelize } from "./sequelize";
import { Product } from "../resources/products/model";
import { User } from "../resources/users/model";
import { ShoppingList, ShoppingItem } from "../resources/shopping-lists/model";

User.hasOne(ShoppingList);
ShoppingList.belongsTo(User);

ShoppingList.hasMany(ShoppingItem);
ShoppingItem.belongsTo(ShoppingList);
ShoppingItem.belongsTo(Product, { onDelete: "CASCADE" });

export { sequelize, Product, User, ShoppingList, ShoppingItem };

import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../../database";

export interface ShoppingListModel {
  id: number;
  status: string;
  title: string;
  userId: number;
}

export const ShoppingList: ModelDefined<
  ShoppingListModel,
  Pick<ShoppingListModel, "title" | "userId">
> = sequelize.define(
  "shoppingList",
  {
    status: {
      type: DataTypes.ENUM("pending", "cancelled", "completed"),
      defaultValue: "pending",
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: true }
);

export interface ShoppingItemModel {
  id: number;
  productId: number;
  quantity: number;
  shoppingListId: number;
}

export const ShoppingItem: ModelDefined<
  ShoppingItemModel,
  Omit<ShoppingItemModel, "id">
> = sequelize.define(
  "shoppingItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
  },
  { timestamps: false }
);

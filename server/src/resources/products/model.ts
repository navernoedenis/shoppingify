import { sequelize } from "../../database";
import { DataTypes, ModelDefined } from "sequelize";

export interface ProductModel {
  id: number;
  name: string;
  note: string | null;
  image: string | null;
  category: string;
}

export const Product: ModelDefined<
  ProductModel,
  Pick<ProductModel, "name" | "category">
> = sequelize.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

import argon2 from "argon2";
import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../../database";

export interface UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
}

export const User: ModelDefined<
  UserModel,
  Omit<UserModel, "id">
> = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 8
      },
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        min: 3
      },
      allowNull: false
    }
  },
  { timestamps: true }
);

User.addHook("beforeCreate", async (user) => {
  const me = user.toJSON();
  const hash = await argon2.hash(me.password);
  user.setDataValue("password", hash);
});

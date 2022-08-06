import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Op, ValidationError } from "sequelize";

import { AppError } from "../../helpers/errors";
import { RequestBody } from "../../types/global";

import { Product, ProductModel } from "../products/model";

import {
  ShoppingItemModel,
  ShoppingList,
  ShoppingItem
} from "../shopping-lists/model";

interface CreateShoppingListBody {
  title: string;
  shoppingList: Pick<ShoppingItemModel, "quantity" | "productId">[];
}

export const createShoppingList = async (
  req: RequestBody<CreateShoppingListBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const shoppingList = req.body.shoppingList;
    const title = req.body.title;

    if (!title) {
      throw new AppError(
        "Please, set title to shopping list",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!shoppingList || !shoppingList.length) {
      throw new AppError("Empty shopping items data", StatusCodes.BAD_REQUEST);
    }

    const userId = Number(req.headers["x-user-id"]);
    const isShoppingListExist = await ShoppingList.findOne({
      where: { userId, status: "pending" }
    });

    if (isShoppingListExist) {
      throw new AppError(
        "At first, you should to close your last shopping list with pending status",
        StatusCodes.BAD_REQUEST
      );
    }

    const newShoppingList = await ShoppingList.create({ userId, title }).then(
      (shoppingList) => shoppingList.toJSON()
    );

    await ShoppingItem.bulkCreate(
      shoppingList.map(({ quantity, productId }) => ({
        quantity,
        productId,
        shoppingListId: Number(newShoppingList.id)
      }))
    );

    const myShoppingList = await ShoppingList.findByPk(newShoppingList.id, {
      attributes: { exclude: ["userId", "updatedAt"] },
      include: [
        {
          model: ShoppingItem,
          attributes: { exclude: ["shoppingListId", "productId"] },
          include: [{ model: Product }]
        }
      ]
    });

    res.status(StatusCodes.OK).json({ shoppingList: myShoppingList });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const getShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shoppingList = await ShoppingList.findOne({
      attributes: { exclude: ["userId", "updatedAt"] },
      where: { userId: Number(req.headers["x-user-id"]), status: "pending" },
      include: [
        {
          model: ShoppingItem,
          attributes: { exclude: ["shoppingListId", "productId"] },
          include: [{ model: Product }]
        }
      ]
    });

    res.status(StatusCodes.OK).json({ shoppingList });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const getClosedShoppingLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shoppingLists = await ShoppingList.findAll({
      attributes: { exclude: ["userId", "updatedAt"] },
      where: {
        userId: Number(req.headers["x-user-id"]),
        status: { [Op.not]: "pending" }
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ShoppingItem,
          attributes: { exclude: ["shoppingListId", "productId"] },
          include: [{ model: Product }]
        }
      ]
    });

    res.status(StatusCodes.OK).json({ shoppingLists });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const closeShoppingList = async (
  req: RequestBody<{ status: "cancelled" | "completed" }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.status) {
      throw new AppError("No shopping-list status", StatusCodes.BAD_REQUEST);
    }
    const userId = Number(req.headers["x-user-id"]);
    const shoppingList = await ShoppingList.findOne({
      where: { userId, status: "pending" }
    });

    if (!shoppingList) {
      throw new AppError(
        "No shopping-list with pending status",
        StatusCodes.BAD_REQUEST
      );
    }

    const updatedShoppingList = await shoppingList.update({
      status: req.body.status
    });

    res.status(StatusCodes.OK).json({ shoppingList: updatedShoppingList });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const deleteShoppingItem = async (
  req: RequestBody<{ ids: number[] }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.ids?.length) {
      throw new AppError("No shopping-items id's", StatusCodes.BAD_REQUEST);
    }

    await ShoppingItem.destroy({ where: { $id$: req.body.ids } });

    res.status(StatusCodes.OK).end();
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

interface ShoppingListItem {
  updatedAt: Date;
  shoppingItems: {
    quantity: number;
    product: Pick<ProductModel, "id" | "name" | "category">;
  };
}

interface ShoppingListMap {
  [category: string]: {
    id: number;
    name: string;
    quantity: number;
  }[];
}

export const getShoppingListStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shoppingLists = (await ShoppingList.findAll({
      attributes: ["createdAt"],
      where: { userId: Number(req.headers["x-user-id"]), status: "completed" },
      include: [
        {
          model: ShoppingItem,
          attributes: ["quantity"],
          include: [{ model: Product, attributes: ["name", "category"] }]
        }
      ],
      raw: true,
      nest: true
    })) as unknown as ShoppingListItem[];

    console.log("shoppingLists: ", shoppingLists);

    if (!shoppingLists.length) {
      return res.status(StatusCodes.OK).json({ statistic: null });
    }

    const shoppingListMap = shoppingLists.reduce(
      (shoppingListMap, { shoppingItems }) => {
        const { quantity } = shoppingItems;
        const { id, name, category: title } = shoppingItems.product;

        if (!title) {
          // skip removed element
          return shoppingListMap;
        }

        const category = title.toLocaleLowerCase();

        if (!(category in shoppingListMap)) {
          shoppingListMap[category] = [];
        }

        const categoryItemIndex = shoppingListMap[category].findIndex(
          (categoryItem) => categoryItem.id === id
        );

        if (categoryItemIndex === -1) {
          shoppingListMap[category].push({ id, name, quantity });
        } else {
          shoppingListMap[category][categoryItemIndex].quantity += quantity;
        }

        return shoppingListMap;
      },

      {} as ShoppingListMap
    );

    res.status(StatusCodes.OK).json({ statistic: shoppingListMap });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

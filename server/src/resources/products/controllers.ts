import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "sequelize";

import { AppError } from "../../helpers/errors";
import { Product } from "../../database";
import { ProductModel } from "../products/model";
import { RequestBody } from "../../types/global";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.findAll();
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const createProduct = async (
  req: RequestBody<{ product: Omit<ProductModel, "id"> | null }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body.product;
    if (!product) {
      throw new AppError("No product data", StatusCodes.BAD_REQUEST);
    }

    const newProduct = await Product.create(product);
    res.status(StatusCodes.OK).json({ product: newProduct });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      throw new AppError("Wrong product id!", StatusCodes.BAD_REQUEST);
    }

    const product = await Product.findByPk(productId);
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const updateProduct = async (
  req: RequestBody<{ product: Omit<ProductModel, "id"> | null }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const product = req.body.product;

    if (!productId) {
      throw new AppError("Wrong product id!", StatusCodes.BAD_REQUEST);
    }

    if (!product) {
      throw new AppError("No product data", StatusCodes.BAD_REQUEST);
    }

    const targetProduct = await Product.findByPk(productId);
    if (!targetProduct) {
      throw new AppError("No product with this id", StatusCodes.BAD_REQUEST);
    }

    const updatedProduct = await targetProduct.update(product);

    res.status(StatusCodes.OK).json({ product: updatedProduct });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};

export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      throw new AppError("No product id", StatusCodes.BAD_REQUEST);
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError("No product by this id", StatusCodes.BAD_REQUEST);
    }

    await product.destroy();

    res
      .status(StatusCodes.OK)
      .json({ message: "Product removed successfully!" });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
    } else {
      if (error instanceof ValidationError) {
        next(new AppError(error.errors[0].message, StatusCodes.BAD_REQUEST));
      } else {
        next(error);
      }
    }
  }
};

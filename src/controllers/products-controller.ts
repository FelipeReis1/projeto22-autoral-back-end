import { Request, Response } from "express";
import httpStatus from "http-status";
import productsService from "../services/products-service";

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, image, itemQuality, category } = req.body;
  try {
    const product = await productsService.createProduct({
      name,
      description,
      price,
      image,
      itemQuality,
      category,
    });
    return res.status(httpStatus.CREATED).send(product);
  } catch (error: any) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productsService.getProducts();
    return res.status(httpStatus.OK).send(products);
  } catch (error: any) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, price, image, itemQuality, category } = req.body;
    const product = await productsService.updateProduct(Number(id), {
      name,
      description,
      price,
      image,
      itemQuality,
      category,
    });
    return res.status(httpStatus.OK).send(product);
  } catch (error: any) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(Number(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error: any) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}

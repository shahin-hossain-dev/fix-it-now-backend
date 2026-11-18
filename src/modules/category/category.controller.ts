import type { Request, Response } from "express";
import { categoryServices } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const createCategory = async (req: Request, res: Response) => {
  const payload = req.body;

  const newCategory = await categoryServices.createCategory(payload);

  sendResponse(res, status.CREATED, {
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
};

const getCategories = async (req: Request, res: Response) => {
  const categories = await categoryServices.getCategories();

  sendResponse(res, status.OK, {
    success: true,
    message: "Category retrieve successfully",
    data: categories,
  });
};
const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await categoryServices.getCategoryById(id as string);

  sendResponse(res, status.OK, {
    success: true,
    message: "Category retrieve successfully",
    data: category,
  });
};

export const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
};

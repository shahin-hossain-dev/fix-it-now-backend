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

export const categoryController = { createCategory };

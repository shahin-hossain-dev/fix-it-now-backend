import prisma from "../../libs/prisma";
import type { TCategoryPayload } from "./category.interface";

const createCategory = async (categoryPayload: TCategoryPayload) => {
  const { name, description, image } = categoryPayload;

  const newCategory = await prisma.category.create({
    data: {
      name: name.trim(),
      description: description || null,
      image: image || null,
    },
  });

  return newCategory;
};

const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

const getCategoryById = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(categoryId) },
  });

  return category;
};

const updateCategoryById = async (
  categoryId: string,
  categoryPayload: TCategoryPayload,
) => {
  const { name, description, image } = categoryPayload;

  const newCategory = await prisma.category.update({
    where: { id: Number(categoryId) },
    data: {
      name: name.trim(),
      description: description || null,
      image: image || null,
    },
  });

  return newCategory;
};

export const categoryServices = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
};

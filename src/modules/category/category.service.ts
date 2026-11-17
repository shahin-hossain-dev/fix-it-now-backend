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

export const categoryServices = { createCategory };

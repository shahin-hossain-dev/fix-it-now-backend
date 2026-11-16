import prisma from "../../libs/prisma";

interface TServicePayload {
  categoryId: number;
  technicianId: number;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  warranty: string;
  coverage: string;
}
export const createServices = async (servicePayload: TServicePayload) => {
  const title = servicePayload.title;

  const isExist = await prisma.service.findFirst({ where: { title: title } });

  if (isExist) {
    throw new Error("Services Already Exists");
  }

  const newService = await prisma.service.create({
    data: {
      categoryId: servicePayload.categoryId,
      technicianId: servicePayload.technicianId,
      title: servicePayload.title,
      description: servicePayload.description,
      price: servicePayload.price,
      durationMinutes: servicePayload.durationMinutes,
      warranty: servicePayload.warranty,
      coverage: servicePayload.coverage,
    },
  });

  return { service: newService };
};

export const serviceServices = { createServices };

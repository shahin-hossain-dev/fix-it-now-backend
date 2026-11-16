import type { Request, Response } from "express";
import { serviceServices } from "./service.services";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const createService = async (req: Request, res: Response) => {
  const payload = req.body;
  const newService = await serviceServices.createServices(payload);

  sendResponse(res, status.CREATED, {
    message: "Created Services Successfully",
    success: true,
    data: newService,
  });
};

export const servicesController = { createService };

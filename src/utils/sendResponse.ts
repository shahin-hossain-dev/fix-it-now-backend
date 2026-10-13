import type { Response } from "express";

interface TSendResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
const sendResponse = <T>(
  res: Response,
  statusCode: number,
  response: TSendResponse<T>,
) => {
  return res.status(statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data,
  });
};

export default sendResponse;

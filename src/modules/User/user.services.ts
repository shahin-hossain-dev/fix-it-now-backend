import status from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../libs/prisma";

const getProfile = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized Access");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user;

  return safeUser;
};

export const userServices = { getProfile };
